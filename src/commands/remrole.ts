import { embeds } from '../embeds';
import { Message, PermissionsBitField } from 'discord.js';

export async function remroleCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageRoles))
		return message.reply(embeds.PermissionError);
	if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles))
		return message.reply(embeds.remrolePermissionError);
	const role = message.mentions.roles.first();
	const member = message.mentions.members?.first();
	if (!role || !member) return message.reply(embeds.remroleHelp);
	member.roles
		.remove(role)
		.then(() => {
			message.reply(embeds.remroleSuccess);
		})
		.catch(() => {
			message.reply(embeds.remroleError);
		});
}
