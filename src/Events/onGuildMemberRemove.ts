import { ServerLeaveData, ServerMemberData } from '../Utils/ServerData';
import { bannedServers, bannedUsers } from '../index';
import { EmbedBuilder, GuildMember, PartialGuildMember, PermissionsBitField } from 'discord.js';
import { readFileSync } from 'fs';

export async function onGuildMemberRemove(member: GuildMember | PartialGuildMember) {
	if (bannedUsers.includes(member.user.id) || bannedServers.includes(member.guild.id)) return;
	const serverId = member.guild.id;
	const rawData = readFileSync('./database/leave_messages.json', 'utf-8');
	const data: Record<string, ServerLeaveData> = JSON.parse(rawData);
	const serverData = data[serverId];
	if (serverData) {
		try {
			const channel = member.guild.channels.cache.get(serverData.channelId);
			if (channel && channel.isTextBased()) {
				if (!member.guild?.members.me?.permissionsIn(channel).has(PermissionsBitField.Flags.SendMessages)) return;
				if (member.user.bot) {
					channel.send(`${member.user.username}との連携が解除されました`).catch(() => {});
				} else {
					channel.send(serverData.leaveMessage.replace('{user}', member.user.toString())).catch(console.error);
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
	const logRawData = readFileSync('./database/memberlogs.json', 'utf-8');
	const logdata: Record<string, ServerMemberData> = JSON.parse(logRawData);
	const serverlogData = logdata[serverId];
	if (serverlogData) {
		try {
			const channel = member.guild.channels.cache.get(serverlogData.channelId);
			if (channel && channel.isTextBased()) {
				if (!member.guild?.members.me?.permissionsIn(channel).has(PermissionsBitField.Flags.SendMessages)) return;
				const embed = new EmbedBuilder()
					.setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
					.setDescription(`${member.user} がサーバーから退出しました`)
					.setColor('#0099ff')
					.setThumbnail(member.user.displayAvatarURL())
					.setFooter({ text: member.guild.name })
					.setTimestamp();
				channel.send({ embeds: [embed] });
			}
		} catch (error) {
			console.error(error);
		}
	}
}
