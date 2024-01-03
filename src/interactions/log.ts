import { ServerMemberData, ServerMsgData, ServerRoleData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { ChatInputCommandInteraction, Guild, TextBasedChannel } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function logCommand(interaction: ChatInputCommandInteraction) {
	const subcommand = interaction.options.getSubcommand();
	switch (subcommand) {
		case 'member':
			{
				const channel = interaction.channel as TextBasedChannel;
				const guild = interaction.guild as Guild;
				const serverId = guild.id;
				const rawData = readFileSync('./database/memberlogs.json', 'utf-8');
				const data: Record<string, ServerMemberData> = JSON.parse(rawData);
				data[serverId] = {
					channelId: channel.id
				};
				writeFile('./database/memberlogs.json', JSON.stringify(data, null, 2), (err) => {
					if (err) {
						interaction.reply(embeds.defaultError);
						console.error(err);
					} else {
						interaction.reply(embeds.saveSuccess);
					}
				});
			}
			break;
		case 'message':
			{
				const channel = interaction.channel as TextBasedChannel;
				const guild = interaction.guild as Guild;
				const serverId = guild.id;
				const rawData = readFileSync('./database/msglogs.json', 'utf-8');
				const data: Record<string, ServerMsgData> = JSON.parse(rawData);
				data[serverId] = {
					channelId: channel.id
				};
				writeFile('./database/msglogs.json', JSON.stringify(data, null, 2), (err) => {
					if (err) {
						interaction.reply(embeds.defaultError);
					} else {
						interaction.reply(embeds.saveSuccess);
					}
				});
			}
			break;
		case 'role':
			{
				const channel = interaction.channel as TextBasedChannel;
				const guild = interaction.guild as Guild;
				const serverId = guild.id;
				const rawData = readFileSync('./database/rolelogs.json', 'utf-8');
				const data: Record<string, ServerRoleData> = JSON.parse(rawData);
				data[serverId] = {
					channelId: channel.id
				};
				writeFile('./database/rolelogs.json', JSON.stringify(data, null, 2), (err) => {
					if (err) {
						interaction.reply(embeds.defaultError);
						console.error(err);
					} else {
						interaction.reply(embeds.saveSuccess);
					}
				});
			}
			break;
		case 'stop': {
			const types = interaction.options.getString('type', true);
			switch (types) {
				case 'member':
					{
						const guild = interaction.guild as Guild;
						const serverId = guild.id;
						const rawData = readFileSync('./database/memberlogs.json', 'utf-8');
						const data: Record<string, ServerMemberData> = JSON.parse(rawData);
						delete data[serverId];
						writeFile('./database/memberlogs.json', JSON.stringify(data, null, 2), (err) => {
							if (err) {
								interaction.reply(embeds.defaultError);
								console.error(err);
							} else {
								interaction.reply(embeds.saveSuccess);
							}
						});
					}
					break;
				case 'message':
					{
						const guild = interaction.guild as Guild;
						const serverId = guild.id;
						const rawData = readFileSync('./database/msglogs.json', 'utf-8');
						const data: Record<string, ServerMsgData> = JSON.parse(rawData);
						delete data[serverId];
						writeFile('./database/msglogs.json', JSON.stringify(data, null, 2), (err) => {
							if (err) {
								interaction.reply(embeds.defaultError);
							} else {
								interaction.reply(embeds.saveSuccess);
							}
						});
					}
					break;
				case 'role':
					{
						const guild = interaction.guild as Guild;
						const serverId = guild.id;
						const rawData = readFileSync('./database/rolelogs.json', 'utf-8');
						const data: Record<string, ServerRoleData> = JSON.parse(rawData);
						delete data[serverId];
						writeFile('./database/rolelogs.json', JSON.stringify(data, null, 2), (err) => {
							if (err) {
								interaction.reply(embeds.defaultError);
								console.error(err);
							} else {
								interaction.reply(embeds.saveSuccess);
							}
						});
					}
					break;
			}
			break;
		}
	}
}
