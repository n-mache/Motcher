import { embeds } from '../embeds';
import { PermissionsBitField, Message } from 'discord.js';

export async function untimeoutCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.ModerateMembers))
		return message.reply('このコマンドを使用する権限がありません');
	if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ModerateMembers))
		return message.reply(embeds.timeoutPermissionError);
	const member = message.mentions.members?.first();
	if (!member) return message.reply(embeds.untimeoutHelp);
	if (member.communicationDisabledUntil !== null) {
		member
			.timeout(null)
			.then(() => {
				message.reply(embeds.untimeoutSuccess);
			})
			.catch(() => {
				message.reply(embeds.untimeoutError);
			});
	} else {
		message.reply(embeds.untimeoutNo);
	}
}
