import { bannedServers, bannedUsers, list } from '../index';
import { connect, Database } from 'aurora-mongo';
import { EmbedBuilder, GuildMember, PartialGuildMember, PermissionsBitField } from 'discord.js';
import { config } from 'dotenv';

config();

export async function onGuildMemberUpdate(oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) {
	if (bannedUsers.includes(newMember.user.id) || bannedServers.includes(newMember.guild?.id)) return;
	await connect(process.env.MONGO_URL!);
	const MemberLog = new Database('MemberLog');
	list['member'] = await MemberLog.keys();
	const serverId = oldMember.guild.id;
	if (list['join'].includes(serverId)) {
		try {
			const MemberLogData = (await MemberLog.get(serverId)) as string;
			const channel = oldMember.guild.channels.cache.get(MemberLogData);
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
