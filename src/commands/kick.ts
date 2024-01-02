import { embeds } from '../embeds';
import { PermissionsBitField, Message } from 'discord.js';

export async function kickCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.KickMembers))
		return message.reply('コマンドを使用する権限がありません。');
	if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.KickMembers))
		return message.reply(embeds.kickPermissionError);
	const member = message.mentions.members?.first();
	if (!member) return message.reply(embeds.kickHelp);
	member
		.kick()
		.then(() => {
			message.reply(embeds.kickSuccess);
		})
		.catch(() => {
			message.reply(embeds.kickError);
		});
}
