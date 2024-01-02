import { embeds } from '../embeds';
import { Guild, Message, PermissionsBitField } from 'discord.js';
import { writeFile } from 'fs';

export async function deleteleaveCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.Administrator))
		return message.reply(embeds.PermissionError);
	const guild = message.guild as Guild;
	const serverId = guild.id;
	const data = JSON.parse('./database/leave_messages.json');
	delete data[serverId];
	writeFile('./database/leave_messages.json', JSON.stringify(data, null, 2), (err) => {
		if (err) {
			message.reply(embeds.defaultError);
			console.error(err);
		} else {
			message.reply(embeds.deleteSuccess);
		}
	});
}
