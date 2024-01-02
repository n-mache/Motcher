import { ServerResponseData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Guild, Message, PermissionsBitField } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function responseCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageMessages))
		return message.reply(embeds.PermissionError);
	const arggs = message.content.slice('mc!response'.length).trim().split(/ +/);
	const keyword = message.content.split(' ')[1];
	const response = arggs.slice(1).join(' ');
	const guild = message.guild as Guild;
	const serverId = guild.id;
	if (!keyword || !response) return message.reply(embeds.responseHelp);
	const rawData = readFileSync('./database/responses.json', 'utf-8');
	const data: Record<string, ServerResponseData> = JSON.parse(rawData);
	let serverData = data[serverId];
	if (!serverData) {
		serverData = {};
		data[serverId] = serverData;
	}
	serverData[keyword] = response;
	writeFile('./database/responses.json', JSON.stringify(data, null, 2), (err) => {
		if (err) {
			message.reply(embeds.defaultError);
		} else {
			message.reply(embeds.saveSuccess);
		}
	});
}
