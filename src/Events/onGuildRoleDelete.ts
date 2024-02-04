import { bannedServers, list } from '../index';
import { Database, connect } from 'aurora-mongo';
import { EmbedBuilder, PermissionsBitField, Role } from 'discord.js';
import { config } from 'dotenv';

config();

export async function onGuildRoleDelete(role: Role) {
	if (bannedServers.includes(role.guild.id)) return;
	await connect(process.env.MONGO_URL!);
	const RoleLog = new Database('RoleLog');
	list['role'] = await RoleLog.keys();
	const serverId = role.guild.id;
	if (list['role'].includes(serverId)) {
		try {
			const data = (await RoleLog.get(serverId)) as string;
			const channel = role.guild.channels.cache.get(data);
			if (channel && channel.isTextBased()) {
				if (!role.guild.members.me?.permissionsIn(channel).has(PermissionsBitField.Flags.SendMessages)) return;
				const embed = new EmbedBuilder().setDescription(`${role.name} ロールが削除されました`).setTimestamp().setColor('#0099ff');
				channel.send({ embeds: [embed] });
			}
		} catch (error) {
			console.error(error);
		}
	}
}
