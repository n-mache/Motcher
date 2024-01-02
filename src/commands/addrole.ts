import { embeds } from '../embeds';
import { Message, PermissionsBitField } from 'discord.js';

export async function addroleCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageRoles))
		return message.reply(embeds.PermissionError);
	if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles))
		return message.reply(embeds.roleAddPermissionError);
	const role = message.mentions.roles.first();
	const member = message.mentions.members?.first();
	if (!role || !member) return message.reply(embeds.roleAddHelp);
	member.roles
		.add(role)
		.then(() => {
			message.reply(embeds.roleAddSuccess);
		})
		.catch(() => {
			message.reply(embeds.roleAddError);
		});
	return;
}
