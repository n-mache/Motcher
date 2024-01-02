import { ServerJoinData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Guild, Message, PermissionsBitField } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function joinmsgCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.Administrator))
		return message.reply(embeds.PermissionError);
	const detail = message.content.slice('mc!joinmsg'.length).trim();
	const channel = message.channel;
	const guild = message.guild as Guild;
	const serverId = guild.id;
	if (!detail) return message.reply(embeds.joinmsgHelp);
	const rawData = readFileSync('./database/join_messages.json', 'utf-8');
	const data: Record<string, ServerJoinData> = JSON.parse(rawData);
	data[serverId] = {
		joinMessage: detail,
		channelId: channel.id
	};
	writeFile(`./database/join_messages.json`, JSON.stringify(data, null, 2), (err) => {
		if (err) {
			message.reply(embeds.defaultError);
		} else {
			message.reply(embeds.saveSuccess);
		}
	});
}
