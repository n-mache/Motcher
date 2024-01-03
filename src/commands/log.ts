import { ServerMemberData, ServerMsgData, ServerRoleData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Message, Guild, TextBasedChannel } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function logCommand(message: Message) {
	const args = message.content.split(' ');
	const subcommand = args[1];
	switch (subcommand) {
		case 'member':
			{
				const channel = message.channel as TextBasedChannel;
				const guild = message.guild as Guild;
				const serverId = guild.id;
				const rawData = readFileSync('./database/memberlogs.json', 'utf-8');
				const data: Record<string, ServerMemberData> = JSON.parse(rawData);
				data[serverId] = {
					channelId: channel.id
				};
				writeFile('./database/memberlogs.json', JSON.stringify(data, null, 2), (err) => {
					if (err) {
						message.reply(embeds.defaultError);
						console.error(err);
					} else {
						message.reply(embeds.saveSuccess);
					}
				});
			}
			break;
		case 'message':
			{
				const channel = message.channel as TextBasedChannel;
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
			break;
		case 'role':
			{
				const channel = message.channel as TextBasedChannel;
				const guild = message.guild as Guild;
				const serverId = guild.id;
				const rawData = readFileSync('./database/rolelogs.json', 'utf-8');
				const data: Record<string, ServerRoleData> = JSON.parse(rawData);
				data[serverId] = {
					channelId: channel.id
				};
				writeFile('./database/rolelogs.json', JSON.stringify(data, null, 2), (err) => {
					if (err) {
						message.reply(embeds.defaultError);
						console.error(err);
					} else {
						message.reply(embeds.saveSuccess);
					}
				});
			}
			break;
		case 'stop': {
			const types = args[2];
			switch (types) {
				case 'member':
					{
						const guild = message.guild as Guild;
						const serverId = guild.id;
						const rawData = readFileSync('./database/memberlogs.json', 'utf-8');
						const data: Record<string, ServerMemberData> = JSON.parse(rawData);
						delete data[serverId];
						writeFile('./database/memberlogs.json', JSON.stringify(data, null, 2), (err) => {
							if (err) {
								message.reply(embeds.defaultError);
								console.error(err);
							} else {
								message.reply(embeds.saveSuccess);
							}
						});
					}
					break;
				case 'message':
					{
						const guild = message.guild as Guild;
						const serverId = guild.id;
						const rawData = readFileSync('./database/msglogs.json', 'utf-8');
						const data: Record<string, ServerMsgData> = JSON.parse(rawData);
						delete data[serverId];
						writeFile('./database/msglogs.json', JSON.stringify(data, null, 2), (err) => {
							if (err) {
								message.reply(embeds.defaultError);
							} else {
								message.reply(embeds.saveSuccess);
							}
						});
					}
					break;
				case 'role':
					{
						const guild = message.guild as Guild;
						const serverId = guild.id;
						const rawData = readFileSync('./database/rolelogs.json', 'utf-8');
						const data: Record<string, ServerRoleData> = JSON.parse(rawData);
						delete data[serverId];
						writeFile('./database/rolelogs.json', JSON.stringify(data, null, 2), (err) => {
							if (err) {
								message.reply(embeds.defaultError);
								console.error(err);
							} else {
								message.reply(embeds.saveSuccess);
							}
						});
					}
					break;
			}
			break;
		}
		default:
			message.reply(embeds.logHelp);
			break;
	}
}
