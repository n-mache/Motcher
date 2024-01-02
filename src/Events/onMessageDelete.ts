import { ServerMsgData } from '../Utils/ServerData';
import { bannedUsers, bannedServers } from '../index';
import { EmbedBuilder, Guild, GuildBasedChannel, Message, PartialMessage, PermissionsBitField, User } from 'discord.js';
import { readFileSync } from 'fs';

export async function onMessageDelete(message: Message | PartialMessage) {
	if (bannedUsers.includes((message.author as User).id) || bannedServers.includes((message.guild as Guild).id)) return;
	if (
		!message.content ||
		!message.guild?.members.me
			?.permissionsIn(message.channel as GuildBasedChannel)
			.has(PermissionsBitField.Flags.SendMessages) ||
		!message.guild
	)
		return;
	const serverId = message.guild.id;
	const rawData = readFileSync('./database/msglogs.json', 'utf-8');
	const data: Record<string, ServerMsgData> = JSON.parse(rawData);
	const serverData = data[serverId];
	if (!serverData) return;
	try {
		const channel = message.guild.channels.cache.get(serverData.channelId);
		if (channel && channel.isTextBased()) {
			const embed = new EmbedBuilder()
				.setDescription(`${message.channel}で${message.member?.user ?? 'Webhook'}のメッセージが削除されました。`)
				.setColor('#0099ff')
				.addFields({ name: 'メッセージ', value: message.content })
				.setThumbnail((message.author as User).displayAvatarURL() ?? null)
				.setTimestamp();
			channel.send({ embeds: [embed] }).catch(() => {});
		}
	} catch (error) {
		console.error(error);
	}
}
