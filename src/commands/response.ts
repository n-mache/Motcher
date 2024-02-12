import { embeds } from '../embeds';
import { list } from '../index';
import { connect, Database } from 'aurora-mongo';
import { Guild, Message, PermissionsBitField } from 'discord.js';
import { config } from 'dotenv';

config();

export async function responseCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply(embeds.PermissionError);
	await connect(process.env.MONGO_URL!);
	const Response = new Database('Response');
	list['response'] = await Response.keys();
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
				await Response.set(`${serverId},${keyword}`, response)
					.then(async () => {
						list['response'] = await Response.keys();
						message.reply(embeds.saveSuccess);
					})
					.catch((err) => {
						message.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		case 'remove':
			{
				const keyword = args[2];
				const guild = message.guild as Guild;
				const serverId = guild.id;
				if (!keyword) return message.reply(embeds.responseRemoveHelp);
				const data = await Response.get(`${serverId},${keyword}`);
				if (!data) return message.reply(`キーワード 「${keyword}」 のレスポンスは登録されていません。`);
				await Response.delete(`${serverId},${keyword}`)
					.then(async () => {
						list['response'] = await Response.keys();
						message.reply(embeds.deleteSuccess);
					})
					.catch((err) => {
						message.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		case 'list':
			{
				const msg = await message.reply('レスポンス一覧を取得しています...');
				const guild = message.guild as Guild;
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
					msg.edit(embeds.resnowEmpty);
					return;
				}
				for (const field of serverData) {
					responseList += field;
				}
				msg.edit(responseList);
			}
			break;
		default:
			message.reply(embeds.responseHelp);
			break;
	}
}
