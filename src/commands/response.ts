import { ServerResponseData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Guild, Message, PermissionsBitField } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function responseCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply(embeds.PermissionError);
	const args = message.content.split(' ');
	const subcommand = args[1] as string | undefined;
	switch (subcommand) {
		case 'add':
			{
				const guild = message.guild as Guild;
				const serverId = guild.id;
				const keyword = args[2];
				const response = args[3];
				if (!keyword || !response) return message.reply(embeds.responseAddHelp);
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
						message.reply(embeds.defaultError);
					} else {
						message.reply(embeds.saveSuccess);
					}
				});
			}
			break;
		case 'remove':
			{
				const keyword = args[2];
				const guild = message.guild as Guild;
				const serverId = guild.id;
				const rawData = readFileSync('./database/responses.json', 'utf-8');
				const data: Record<string, ServerResponseData> = JSON.parse(rawData);
				const serverData = data[serverId];
				if (!keyword) return message.reply(embeds.responseRemoveHelp);
				if (!serverData || !serverData[keyword]) return message.reply(`キーワード 「${keyword}」 のレスポンスは登録されていません。`);
				delete serverData[keyword];

				writeFile('./database/responses.json', JSON.stringify(data, null, 2), (err) => {
					if (err) {
						message.reply(embeds.defaultError);
						console.error(err);
					} else {
						message.reply(embeds.deleteSuccess);
					}
				});
			}
			break;
		case 'list':
			{
				const guild = message.guild as Guild;
				const serverId = guild.id;
				const rawData = readFileSync('./database/responses.json', 'utf-8');
				const data: Record<string, ServerResponseData> = JSON.parse(rawData);
				const serverData = data[serverId];
				if (!serverData || Object.keys(serverData).length === 0) {
					message.reply(embeds.resnowEmpty);
					return;
				}
				let responseList = '登録されているレスポンス一覧\n';
				for (const keyword in serverData) {
					responseList += `${keyword} => ${serverData[keyword]}\n`;
				}
				message.reply(responseList);
			}
			break;
		default:
			message.reply(embeds.responseHelp);
			break;
	}
}
