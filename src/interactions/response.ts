import { ServerResponseData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Guild, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import { readFileSync, writeFile } from 'fs';

export async function responseCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	const keyword = interaction.options.getString('keyword') as string;
	const response = interaction.options.getString('response') as string;
	const guild = interaction.guild as Guild;
	const serverId = guild.id;
	if (!keyword || !response) return interaction.reply(embeds.responseHelp);
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
			interaction.reply(embeds.defaultError);
		} else {
			interaction.reply(embeds.saveSuccess);
		}
	});
}
