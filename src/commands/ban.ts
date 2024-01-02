import { embeds } from '../embeds';
import { Message, PermissionsBitField } from 'discord.js';

export async function banCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.BanMembers))
		return message.reply(embeds.PermissionError);
	if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.BanMembers))
		return message.reply(embeds.banPermissionError);
	const member = message.mentions.members?.first();
	if (!member) return message.reply(embeds.banHelp);
	member
		.ban()
		.then(() => {
			message.reply(embeds.banSuccess);
		})
		.catch(() => {
			message.reply(embeds.banError);
		});
	return;
}
