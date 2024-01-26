import { ServerRoleData } from '../Utils/ServerData';
import { bannedServers } from '../index';
import { EmbedBuilder, PermissionsBitField, Role } from 'discord.js';
import { readFileSync } from 'fs';

export async function onGuildRoleCreate(role: Role) {
	if (bannedServers.includes(role.guild.id)) return;
	const rawData = readFileSync('./database/rolelogs.json', 'utf-8');
	const data: Record<string, ServerRoleData> = JSON.parse(rawData);
	const serverId = role.guild.id;
	const serverData = data[serverId];
	if (!serverData) return;
	try {
		const channel = role.guild.channels.cache.get(serverData.channelId);
		if (channel && channel.isTextBased()) {
			if (!role.guild?.members.me?.permissionsIn(channel).has(PermissionsBitField.Flags.SendMessages)) return;
			const embed = new EmbedBuilder().setDescription(`新しいロール ${role} が作成されました`).setTimestamp().setColor('#0099ff');
			channel.send({ embeds: [embed] });
		}
	} catch (error) {
		console.error(error);
	}
}
