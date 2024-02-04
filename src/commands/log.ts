import { embeds } from '../embeds';
import { list } from '../index';
import { connect, Database } from 'aurora-mongo';
import { Message, Guild, TextBasedChannel, PermissionsBitField } from 'discord.js';
import { config } from 'dotenv';

config();

export async function logCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply(embeds.PermissionError);
	await connect(process.env.MONGO_URL!);
	const MessageLog = new Database('MessageLog');
	const MemberLog = new Database('MemberLog');
	const RoleLog = new Database('RoleLog');
	list['message'] = await MessageLog.keys();
	list['member'] = await MemberLog.keys();
	list['role'] = await RoleLog.keys();
	const args = message.content.split(' ');
	const subcommand = args[1];
	switch (subcommand) {
		case 'member':
			{
				const channel = message.channel as TextBasedChannel;
				const guild = message.guild as Guild;
				const serverId = guild.id;
				await MemberLog.set(serverId, channel.id)
					.then(async () => {
						list['member'] = await MemberLog.keys();
						message.reply(embeds.saveSuccess);
					})
					.catch((err) => {
						message.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		case 'message':
			{
				const channel = message.channel as TextBasedChannel;
				const guild = message.guild as Guild;
				const serverId = guild.id;
				await MessageLog.set(serverId, channel.id)
					.then(async () => {
						list['message'] = await MessageLog.keys();
						message.reply(embeds.saveSuccess);
					})
					.catch((err) => {
						message.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		case 'role':
			{
				const channel = message.channel as TextBasedChannel;
				const guild = message.guild as Guild;
				const serverId = guild.id;
				await RoleLog.set(serverId, channel.id)
					.then(async () => {
						list['role'] = await RoleLog.keys();
						message.reply(embeds.saveSuccess);
					})
					.catch((err) => {
						message.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		case 'stop': {
			const types = args[2];
			switch (types) {
				case 'member':
					{
						const guild = message.guild as Guild;
						const serverId = guild.id;
						const data = await MemberLog.get(serverId);
						if (!data) return message.reply(embeds.Empty);
						await MemberLog.delete(serverId)
							.then(async () => {
								list['member'] = await MemberLog.keys();
								message.reply(embeds.deleteSuccess);
							})
							.catch((err) => {
								message.reply(embeds.defaultError);
								console.error(err);
							});
					}
					break;
				case 'message':
					{
						const guild = message.guild as Guild;
						const serverId = guild.id;
						const data = await MessageLog.get(serverId);
						if (!data) return message.reply(embeds.Empty);
						await MessageLog.delete(serverId)
							.then(async () => {
								list['message'] = await MessageLog.keys();
								message.reply(embeds.deleteSuccess);
							})
							.catch((err) => {
								message.reply(embeds.defaultError);
								console.error(err);
							});
					}
					break;
				case 'role':
					{
						const guild = message.guild as Guild;
						const serverId = guild.id;
						const data = await RoleLog.get(serverId);
						if (!data) return message.reply(embeds.Empty);
						await RoleLog.delete(serverId)
							.then(async () => {
								list['role'] = await RoleLog.keys();
								message.reply(embeds.deleteSuccess);
							})
							.catch((err) => {
								message.reply(embeds.defaultError);
								console.error(err);
							});
					}
					break;
			}
			break;
		}
		default:
			message.reply(embeds.logHelp);
			break;
	}
}
