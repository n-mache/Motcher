import { bannedUsers, bannedServers, list } from '../index';
import { connect, Database } from 'aurora-mongo';
import { EmbedBuilder, Guild, GuildBasedChannel, Message, PartialMessage, PermissionsBitField, User } from 'discord.js';
import { config } from 'dotenv';

config();

export async function onMessageDelete(message: Message | PartialMessage) {
	if (
		!message.content ||
		!message.guild?.members.me?.permissionsIn(message.channel as GuildBasedChannel).has(PermissionsBitField.Flags.SendMessages) ||
		!message.guild ||
		bannedUsers.includes((message.author as User).id) || bannedServers.includes((message.guild as Guild).id)
	)
		return;
	await connect(process.env.MONGO_URL!);
	const MessageLog = new Database('MessageLog');
	list['message'] = await MessageLog.keys();
	const serverId = message.guild.id;
	if (list['message'].includes(serverId)) {
		try {
			const data = (await MessageLog.get(serverId)) as string;
			const channel = message.guild.channels.cache.get(data);
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
}
