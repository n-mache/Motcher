import { bannedUsers, bannedServers, list } from '../index';
import { connect, Database } from 'aurora-mongo';
import { EmbedBuilder, Guild, Message, PartialMessage, PermissionsBitField, User } from 'discord.js';
import { config } from 'dotenv';

config();

export const onMessageUpdate = async (oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) => {
	if ((oldMessage.author as User).bot || oldMessage.content === newMessage.content || !oldMessage.guild || bannedUsers.includes((newMessage.author as User).id) || bannedServers.includes((newMessage.guild as Guild).id)) return;
	await connect(process.env.MONGO_URL!);
	const MessageLog = new Database('MessageLog');
	list['message'] = await MessageLog.keys();
	if (list['message'].includes((newMessage.guild as Guild).id)) {
		try {
			const data = (await MessageLog.get((newMessage.guild as Guild).id)) as string;
			const channel = oldMessage.guild.channels.cache.get(data);
			if (channel && channel.isTextBased()) {
				if (!oldMessage.guild?.members.me?.permissionsIn(channel).has(PermissionsBitField.Flags.SendMessages)) return;
				const embed = new EmbedBuilder()
					.setDescription(`${oldMessage.channel}で${oldMessage.author}がメッセージを編集しました。\n [メッセージへジャンプ](${newMessage.url})`)
					.addFields({ name: '変更前', value: oldMessage.content ?? 'なし' }, { name: '変更後', value: newMessage.content ?? 'なし' })
					.setColor('#0099ff')
					.setThumbnail((oldMessage.author as User).displayAvatarURL())
					.setTimestamp();
				channel.send({ embeds: [embed] }).catch(() => {});
			}
		} catch (error) {
			console.error(error);
		}
	}
};
