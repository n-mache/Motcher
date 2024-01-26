import { embeds } from '../embeds';
import { Message, PermissionsBitField } from 'discord.js';

export async function roleCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageRoles)) return message.reply(embeds.PermissionError);
	const subcommand = message.content.split(' ')[1];
	switch (subcommand) {
		case 'add':
			{
				if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles)) return message.reply(embeds.roleAddPermissionError);
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
			}
			break;
		case 'remove':
			{
				if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles)) return message.reply(embeds.remrolePermissionError);
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
			break;
		default:
			message.reply(embeds.roleHelp);
			break;
	}
}
