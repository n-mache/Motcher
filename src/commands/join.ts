import { embeds } from '../embeds';
import { list } from '../index';
import { connect, Database } from 'aurora-mongo';
import { Message, TextBasedChannel, PermissionsBitField, Guild } from 'discord.js';
import { config } from 'dotenv';

config();

export async function joinCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply(embeds.PermissionError);
	await connect(process.env.MONGO_URL!);
	const Join = new Database('Join');
	list['join'] = await Join.keys();
	const args = message.content.split(' ');
	const subcommand = args[1] as string | undefined;
	switch (subcommand) {
		case 'message':
			{
				const detail = args[2];
				const guild = message.guild as Guild;
				const serverId = guild.id;
				const channel = message.channel as TextBasedChannel;
				if (!detail) return message.reply(embeds.joinmsgHelp);
				await Join.set(serverId, `${channel.id},${detail}`)
					.then(async () => {
						message.reply(embeds.saveSuccess);
						list['join'] = await Join.keys();
					})
					.catch((err) => {
						message.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		case 'remove':
			{
				const guild = message.guild as Guild;
				const serverId = guild.id;
				const data = await Join.get(serverId);
				if (!data) return message.reply(embeds.Empty);
				await Join.delete(serverId)
					.then(async () => {
						message.reply(embeds.deleteSuccess);
						list['join'] = await Join.keys();
					})
					.catch((err) => {
						message.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		default:
			message.reply(embeds.joinHelp);
			break;
	}
}
