import { ServerJoinData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Message, Guild, TextBasedChannel, PermissionsBitField } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function joinCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.Administrator))
		return message.reply(embeds.PermissionError);
	const args = message.content.split(' ');
	const subcommand = args[1] as string | undefined;
	switch (subcommand) {
		case 'message':
			{
				const detail = args[2];
				const channel = message.channel as TextBasedChannel;
				const guild = message.guild as Guild;
				const serverId = guild.id;
				if (!detail) return message.reply(embeds.joinmsgHelp);
				const rawData = readFileSync('./database/join_messages.json', 'utf-8');
				const data: Record<string, ServerJoinData> = JSON.parse(rawData);
				data[serverId] = {
					joinMessage: detail,
					channelId: channel.id
				};
				writeFile('./database/join_messages.json', JSON.stringify(data, null, 2), (err) => {
					if (err) {
						message.reply(embeds.defaultError);
					} else {
						message.reply(embeds.saveSuccess);
					}
				});
			}
			break;
		case 'remove':
			{
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
			break;
		default:
			message.reply(embeds.joinHelp);
			break;
	}
}
