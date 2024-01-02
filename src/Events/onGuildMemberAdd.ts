import { ServerJoinData, ServerMemberData } from '../Utils/ServerData';
import { bannedServers, bannedUsers } from '../index';
import { EmbedBuilder, GuildMember, PermissionsBitField } from 'discord.js';
import { readFileSync } from 'fs';

export async function onGuildMemberAdd(member: GuildMember) {
	if (bannedUsers.includes(member.user.id) || bannedServers.includes(member.guild?.id)) return;
	const serverId = member.guild.id;
	const rawData = readFileSync('./database/join_messages.json', 'utf-8');
	const data: Record<string, ServerJoinData> = JSON.parse(rawData);
	const serverData = data[serverId];
	if (serverData) {
		try {
			const channel = member.guild.channels.cache.get(serverData.channelId);
			if (channel && channel.isTextBased()) {
				if (!member.guild?.members.me?.permissionsIn(channel).has(PermissionsBitField.Flags.SendMessages)) return;
				if (member.user.bot) {
					channel.send(`${member.user.globalName}が連携されました`).catch(() => {});
				} else {
					channel.send(serverData.joinMessage.replace('{user}', member.user.toString())).catch(() => {});
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
				const createdDate = new Date(member.user.createdAt).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
				const embed = new EmbedBuilder()
					.setAuthor({ name: member.user.globalName ?? member.user.username, iconURL: member.user.displayAvatarURL() })
					.setDescription(`${member.user} がサーバーに参加しました`)
					.setColor('#0099ff')
					.addFields({ name: 'アカウント作成日', value: createdDate })
					.addFields({ name: 'ユーザーネーム', value: member.user.username })
					.setFooter({ text: member.guild.name })
					.setThumbnail(member.user.displayAvatarURL())
					.setTimestamp();
				channel.send({ embeds: [embed] }).catch(() => {});
			}
		} catch (error) {
			console.error(error);
		}
	}
}
