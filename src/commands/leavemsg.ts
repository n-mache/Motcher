import { ServerLeaveData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Guild, Message, PermissionsBitField } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function leavemsgCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.Administrator))
		return message.reply(embeds.PermissionError);
	const detail = message.content.slice('mc!leavemsg'.length).trim();
	const channel = message.channel;
	const guild = message.guild as Guild;
	const serverId = guild.id;
	if (!detail) message.reply(embeds.leavemsgHelp);
	const rawData = readFileSync('./database/leave_messages.json', 'utf-8');
	const data: Record<string, ServerLeaveData> = JSON.parse(rawData);
	data[serverId] = {
		leaveMessage: detail,
		channelId: channel.id
	};
	writeFile('./database/leave_messages.json', JSON.stringify(data, null, 2), (err) => {
		if (err) {
			message.reply(embeds.defaultError);
		} else {
			message.reply(embeds.saveSuccess);
		}
	});
}
