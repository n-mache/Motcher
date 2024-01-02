import { ServerResponseData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { PermissionsBitField, Message, Guild } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function resdeleteCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageMessages))
		return message.reply('貴方にはこのコマンドを使用する権限がありません。');
	const keyword = message.content.slice('mc!resdelete'.length).trim();
	const guild = message.guild as Guild;
	const serverId = guild.id;
	const rawData = readFileSync('./database/responses.json', 'utf-8');
	const data: Record<string, ServerResponseData> = JSON.parse(rawData);
	const serverData = data[serverId];
	if (!serverData || !serverData[keyword])
		return message.reply(`キーワード 「${keyword}」 のレスポンスは登録されていません。`);
	if (!keyword) return message.reply(embeds.resdeleteHelp);
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
