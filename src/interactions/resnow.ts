import { ServerResponseData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Guild, ChatInputCommandInteraction } from 'discord.js';
import { readFileSync } from 'fs';

export async function resnowCommand(interaction: ChatInputCommandInteraction) {
	const guild = interaction.guild as Guild;
	const serverId = guild.id;
	const rawData = readFileSync('./database/responses.json', 'utf-8');
	const data: Record<string, ServerResponseData> = JSON.parse(rawData);
	const serverData = data[serverId];
	if (!serverData || Object.keys(serverData).length === 0) {
		interaction.reply(embeds.resnowEmpty);
		return;
	}
	let responseList = '登録されているレスポンス一覧\n';
	for (const keyword in serverData) {
		responseList += `${keyword}: ${serverData[keyword]}\n`;
	}
	interaction.reply(responseList);
}
