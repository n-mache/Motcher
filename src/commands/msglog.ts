import { ServerMsgData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Guild, Message, PermissionsBitField } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function msglogCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageChannels))
		return message.reply(embeds.PermissionError);
	const channel = message.channel;
	const guild = message.guild as Guild;
	const serverId = guild.id;
	const rawData = readFileSync('./database/msglogs.json', 'utf-8');
	const data: Record<string, ServerMsgData> = JSON.parse(rawData);
	data[serverId] = {
		channelId: channel.id
	};
	writeFile('./database/msglogs.json', JSON.stringify(data, null, 2), (err) => {
		if (err) {
			message.reply(embeds.defaultError);
		} else {
			message.reply(embeds.saveSuccess);
		}
	});
}
