import { ServerResponseData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { ChatInputCommandInteraction, Guild } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function responseCommand(interaction: ChatInputCommandInteraction) {
	const subcommand = interaction.options.getSubcommand(true);
	switch (subcommand) {
		case 'add':
			{
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
			break;
		case 'remove':
			{
				const keyword = interaction.options.getString('keyword') as string;
				const guild = interaction.guild as Guild;
				const serverId = guild.id;
				const rawData = readFileSync('./database/responses.json', 'utf-8');
				const data: Record<string, ServerResponseData> = JSON.parse(rawData);
				const serverData = data[serverId];
				if (!serverData || !serverData[keyword]) return interaction.reply(`キーワード 「${keyword}」 のレスポンスは登録されていません。`);
				delete serverData[keyword];

				writeFile('./database/responses.json', JSON.stringify(data, null, 2), (err) => {
					if (err) {
						interaction.reply(embeds.defaultError);
						console.error(err);
					} else {
						interaction.reply(embeds.deleteSuccess);
					}
				});
			}
			break;
		case 'list':
			{
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
					responseList += `${keyword} => ${serverData[keyword]}\n`;
				}
				interaction.reply(responseList);
			}
			break;
	}
}
