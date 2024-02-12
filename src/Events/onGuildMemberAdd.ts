import { bannedServers, bannedUsers, list } from '../index';
import { connect, Database } from 'aurora-mongo';
import { EmbedBuilder, GuildMember, PermissionsBitField } from 'discord.js';
import { config } from 'dotenv';

config();

export async function onGuildMemberAdd(member: GuildMember) {
	if (bannedUsers.includes(member.user.id) || bannedServers.includes(member.guild.id)) return;
	await connect(process.env.MONGO_URL!);
	const Join = new Database('Join');
	const MemberLog = new Database('MemberLog');
	list['join'] = await Join.keys();
	list['member'] = await MemberLog.keys();
	const serverId = member.guild.id;
	if (list['join'].includes(serverId)) {
		try {
			const data = (await Join.get(serverId)) as string;
			const msg = data.slice(data.indexOf(',') + 1);
			const channel = member.guild.channels.cache.get(data.split(',')[0]);
			if (channel && channel.isTextBased()) {
				if (!member.guild.members.me?.permissionsIn(channel).has(PermissionsBitField.Flags.SendMessages)) return;
				if (member.user.bot) {
					channel.send(`${member.user.displayName}が連携されました`).catch(() => {});
				} else {
					channel.send(msg.replace('{user}', member.user.toString())).catch(() => {});
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
	if (list['member'].includes(serverId)) {
		try {
			const MemberlogData = (await MemberLog.get(serverId)) as string;
			const channel = member.guild.channels.cache.get(MemberlogData);
			if (channel && channel.isTextBased()) {
				if (!member.guild.members.me?.permissionsIn(channel).has(PermissionsBitField.Flags.SendMessages)) return;
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
