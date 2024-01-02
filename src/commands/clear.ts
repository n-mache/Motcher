import { embeds } from '../embeds';
import { ChannelType, Message, PermissionsBitField } from 'discord.js';

export async function clearCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageMessages))
		return message.reply(embeds.PermissionError);
	if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ManageMessages))
		return message.reply(embeds.clearPermissionError);
	const member = message.mentions.users.first();
	const amountString = message.content.split(' ')[2];
	const amount = Number(amountString);
	if (!member || isNaN(amount)) {
		return message.reply(embeds.clearHelp);
	}
	if (amount < 1 || amount > 100) {
		return message.reply('数字は1から100までの間で指定してください');
	}
	const messages = await message.channel.messages.fetch({ limit: 100 });
	const userMessages = Array.from(messages.filter((m) => m.author.id === member.id).values()).slice(0, amount);
	if (message.channel.type !== ChannelType.GuildText) return;
	message.channel
		.bulkDelete(userMessages)
		.then(() => {
			message.reply(
				`メッセージ${userMessages.length}件を削除しました\n(指定した数より削除した数が少ない場合があるのはDiscord側の仕様です)`
			);
		})
		.catch(() => {
			message.reply('メッセージを削除できませんでした。');
		});
}
