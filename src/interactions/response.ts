import { embeds } from '../embeds';
import { list } from '../index';
import { connect, Database } from 'aurora-mongo';
import { ChatInputCommandInteraction, Guild } from 'discord.js';
import { config } from 'dotenv';

config();

export async function responseCommand(interaction: ChatInputCommandInteraction) {
	await connect(process.env.MONGO_URL!);
	const Response = new Database('Response');
	list['response'] = await Response.keys();
	const subcommand = interaction.options.getSubcommand();
	switch (subcommand) {
		case 'add':
			{
				const guild = interaction.guild as Guild;
				const serverId = guild.id;
				const keyword = interaction.options.getString('keyword') as string;
				const response = interaction.options.getString('response') as string;
				if (!keyword || !response) return interaction.reply(embeds.responseAddHelp);
				await Response.set(`${serverId},${keyword}`, response)
					.then(async () => {
						list['response'] = await Response.keys();
						interaction.reply(embeds.saveSuccess);
					})
					.catch((err) => {
						interaction.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		case 'remove':
			{
				const keyword = interaction.options.getString('keyword') as string;
				const guild = interaction.guild as Guild;
				const serverId = guild.id;
				if (!keyword) return interaction.reply(embeds.responseRemoveHelp);
				const data = await Response.get(`${serverId},${keyword}`);
				if (!data) return interaction.reply(`キーワード 「${keyword}」 のレスポンスは登録されていません。`);
				await Response.delete(`${serverId},${keyword}`)
					.then(async () => {
						list['response'] = await Response.keys();
						interaction.reply(embeds.deleteSuccess);
					})
					.catch((err) => {
						interaction.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		case 'list':
			{
				const reply = await interaction.reply('レスポンス一覧を取得しています...');
				const guild = interaction.guild as Guild;
				const serverId = guild.id;
				const data = list['response'];
				const matchingKeys = data.filter((key) => key.split(',')[0] === serverId);
				const serverData: string[] = [];
				let responseList = '登録されているレスポンス一覧\n';
				await Promise.all(
					matchingKeys.map(async (key) => {
						const keyword = key.split(',')[1];
						const value = await Response.get(key);
						serverData.push(`${keyword} => ${value}\n`);
					})
				);
				if (Object.keys(serverData).length === 0) {
					reply.edit(embeds.resnowEmpty);
					return;
				}
				for (const field of serverData) {
					responseList += field;
				}
				reply.edit(responseList);
			}
			break;
	}
}
