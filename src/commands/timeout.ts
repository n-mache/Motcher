import { embeds } from '../embeds';
import { Message, PermissionsBitField } from 'discord.js';

export async function timeoutCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.reply(embeds.PermissionError);
	if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.reply(embeds.timeoutPermissionError);
	const args = message.content.split(' ');
	const member = message.mentions.members?.first();
	const time = parseInt(args[2]);
	if (!member || isNaN(time)) return message.reply(embeds.timeoutHelp);
	if (time <= 0) return message.reply('0分以下は指定できません。');
	member
		.timeout(time * 60000)
		.then(() => {
			message.reply(embeds.timeoutSuccess);
		})
		.catch(() => {
			message.reply(embeds.timeoutError);
		});
}
