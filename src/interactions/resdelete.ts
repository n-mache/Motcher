import { ServerResponseData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { ChatInputCommandInteraction, Guild, GuildMember } from 'discord.js';
import { writeFile } from 'fs';
import { readFileSync } from 'fs';

export async function resdeleteCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	const keyword = interaction.options.getString('keyword') as string;
	const guild = interaction.guild as Guild;
	const serverId = guild.id;
	const rawData = readFileSync('./database/responses.json', 'utf-8');
	const data: Record<string, ServerResponseData> = JSON.parse(rawData);
	const serverData = data[serverId];
	if (!serverData || !serverData[keyword])
		return interaction.reply(`キーワード 「${keyword}」 のレスポンスは登録されていません。`);
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
