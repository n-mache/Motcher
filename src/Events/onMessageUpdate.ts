import { ServerMsgData } from '../Utils/ServerData';
import { bannedUsers, bannedServers } from '../index';
import { EmbedBuilder, Guild, Message, PartialMessage, PermissionsBitField, User } from 'discord.js';
import { readFileSync } from 'fs';

export const onMessageUpdate = async (oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) => {
	if (bannedUsers.includes((newMessage.author as User).id) || bannedServers.includes((newMessage.guild as Guild).id))
		return;
	if ((oldMessage.author as User).bot || oldMessage.content === newMessage.content || !oldMessage.guild) return;
	const serverId = oldMessage.guild.id;
	const rawData = readFileSync('./database/msglogs.json', 'utf-8');
	const data: Record<string, ServerMsgData> = JSON.parse(rawData);
	const serverData = data[serverId];
	if (!serverData) return;
	try {
		const channel = oldMessage.guild.channels.cache.get(serverData.channelId);
		if (channel && channel.isTextBased()) {
			if (!oldMessage.guild?.members.me?.permissionsIn(channel).has(PermissionsBitField.Flags.SendMessages)) return;
			const embed = new EmbedBuilder()
				.setDescription(
					`${oldMessage.channel}で${oldMessage.author}がメッセージを編集しました。\n [メッセージへジャンプ](${newMessage.url})`
				)
				.addFields(
					{ name: '変更前', value: oldMessage.content ?? 'なし' },
					{ name: '変更後', value: newMessage.content ?? 'なし' }
				)
				.setColor('#0099ff')
				.setThumbnail((oldMessage.author as User).displayAvatarURL())
				.setTimestamp();
			channel.send({ embeds: [embed] }).catch(() => {});
		}
	} catch (error) {
		console.error(error);
	}
};
