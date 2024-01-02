import { ServerJoinData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Guild, Message, PermissionsBitField } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function deletejoinCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.Administrator))
		return message.reply(embeds.PermissionError);
	const guild = message.guild as Guild;
	const serverId = guild.id;
	const rawData = readFileSync('./database/join_messages.json', 'utf-8');
	const data: Record<string, ServerJoinData> = JSON.parse(rawData);
	delete data[serverId];
	writeFile('./database/join_messages.json', JSON.stringify(data, null, 2), (err) => {
		if (err) {
			message.reply(embeds.defaultError);
			console.error(err);
		} else {
			message.reply(embeds.deleteSuccess);
		}
	});
}
