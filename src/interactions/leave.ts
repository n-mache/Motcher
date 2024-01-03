import { ServerLeaveData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { ChatInputCommandInteraction, Guild, TextBasedChannel } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function leaveCommand(interaction: ChatInputCommandInteraction) {
	const subcommand = interaction.options.getSubcommand(true);
	switch (subcommand) {
		case 'message':
			{
				const detail = interaction.options.getString('detail');
				const channel = interaction.channel as TextBasedChannel;
				const guild = interaction.guild as Guild;
				const serverId = guild.id;
				if (!detail) return interaction.reply(embeds.leavemsgHelp);
				const rawData = readFileSync('./database/leave_messages.json', 'utf-8');
				const data: Record<string, ServerLeaveData> = JSON.parse(rawData);
				data[serverId] = {
					leaveMessage: detail,
					channelId: channel.id
				};
				writeFile('./database/leave_messages.json', JSON.stringify(data, null, 2), (err) => {
					if (err) {
						interaction.reply(embeds.defaultError);
					} else {
						interaction.reply(embeds.saveSuccess);
					}
				});
			}
			break;
		case 'remove': {
			const guild = interaction.guild as Guild;
			const serverId = guild.id;
			const rawData = readFileSync('./database/leave_messages.json', 'utf-8');
			const data: Record<string, ServerLeaveData> = JSON.parse(rawData);
			delete data[serverId];
			writeFile('./database/leave_messages.json', JSON.stringify(data, null, 2), (err) => {
				if (err) {
					interaction.reply(embeds.defaultError);
					console.error(err);
				} else {
					interaction.reply(embeds.deleteSuccess);
				}
			});
		}
	}
}
