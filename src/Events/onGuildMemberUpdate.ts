import { ServerMemberData } from '../Utils/ServerData';
import { bannedServers, bannedUsers } from '../index';
import { EmbedBuilder, GuildMember, PartialGuildMember, PermissionsBitField } from 'discord.js';
import { readFileSync } from 'fs';

export async function onGuildMemberUpdate(oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) {
	if (bannedUsers.includes(newMember.user.id) || bannedServers.includes(newMember.guild?.id)) return;
	const serverId = oldMember.guild.id;
	const logRawData = readFileSync('./database/memberlogs.json', 'utf-8');
	const logdata: Record<string, ServerMemberData> = JSON.parse(logRawData);
	const serverlogData = logdata[serverId];
	if (serverlogData) {
		try {
			const channel = oldMember.guild.channels.cache.get(serverlogData.channelId);
			if (channel && channel.isTextBased()) {
				if (!oldMember.guild?.members.me?.permissionsIn(channel).has(PermissionsBitField.Flags.SendMessages)) return;
				if (oldMember.nickname !== newMember.nickname) {
					const embed = new EmbedBuilder()
						.setAuthor({ name: oldMember.user.username, iconURL: oldMember.user.displayAvatarURL() })
						.setDescription(`${newMember.user}のニックネームが更新されました`)
						.addFields(
							{ name: '前のニックネーム', value: oldMember.nickname || 'なし', inline: true },
							{ name: '新しいニックネーム', value: newMember.nickname || 'なし', inline: true }
						)
						.setFooter({ text: oldMember.guild.name })
						.setColor('#0099ff')
						.setThumbnail(newMember.user.displayAvatarURL())
						.setTimestamp();
					channel.send({ embeds: [embed] });
				}
				if (oldMember.user.displayAvatarURL() !== newMember.user.displayAvatarURL()) {
					const embed = new EmbedBuilder()
						.setAuthor({ name: oldMember.user.username, iconURL: newMember.user.displayAvatarURL() })
						.setDescription(`${oldMember.user}のアバターが更新されました`)
						.setColor('#0099ff')
						.setFooter({ text: oldMember.guild.name })
						.setThumbnail(newMember.user.displayAvatarURL())
						.setTimestamp();
					channel.send({ embeds: [embed] });
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
}
