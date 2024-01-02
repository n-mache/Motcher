import { ServerRoleData } from '../Utils/ServerData';
import { bannedServers } from '../index';
import { EmbedBuilder, PermissionsBitField, Role } from 'discord.js';
import { readFileSync } from 'fs';

export async function onGuildRoleUpdate(oldRole: Role, newRole: Role) {
	if (bannedServers.includes(newRole.guild.id)) return;
	const rawData = readFileSync('./database/rolelogs.json', 'utf-8');
	const data: Record<string, ServerRoleData> = JSON.parse(rawData);
	const serverId = oldRole.guild.id;
	const serverData = data[serverId];
	if (!serverData) return;
	try {
		const embed = new EmbedBuilder()
			.setTitle('ロールが更新されました')
			.setDescription(`${newRole}`)
			.setColor('#0099ff');
		const changes = [];
		if (oldRole.name !== newRole.name) {
			changes.push(`ロール名: ${oldRole.name} → ${newRole.name}`);
		}
		if (!oldRole.permissions.equals(newRole.permissions)) {
			const addedPerms = oldRole.permissions.missing(newRole.permissions);
			const removedPerms = newRole.permissions.missing(oldRole.permissions);
			if (addedPerms.length > 0) {
				changes.push(`追加された権限: ${addedPerms.map((p) => `\`${p}\``).join(', ')}`);
			}
			if (removedPerms.length > 0) {
				changes.push(`削除された権限: ${removedPerms.map((p) => `\`${p}\``).join(', ')}`);
			}
		}
		if (oldRole.color !== newRole.color) {
			changes.push(`色: ${oldRole.hexColor} → ${newRole.hexColor}`);
		}
		if (changes.length > 0) {
			embed.addFields({ name: '変更された属性', value: changes.join('\n') });
			const channel = newRole.guild.channels.cache.get(serverData.channelId);
			if (channel && channel.isTextBased()) {
				if (!oldRole.guild.members.me?.permissionsIn(channel).has(PermissionsBitField.Flags.SendMessages)) return;
				channel.send({ embeds: [embed] });
			}
		}
	} catch (error) {
		console.error(error);
	}
}
