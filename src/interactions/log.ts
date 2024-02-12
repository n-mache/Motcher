import { embeds } from '../embeds';
import { list } from '../index';
import { connect, Database } from 'aurora-mongo';
import { ChatInputCommandInteraction, Guild, GuildMember, PermissionsBitField, TextBasedChannel } from 'discord.js';
import { config } from 'dotenv';

config();

export async function logCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.member?.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply(embeds.PermissionError);
	await connect(process.env.MONGO_URL!);
	const MessageLog = new Database('MessageLog');
	const MemberLog = new Database('MemberLog');
	const RoleLog = new Database('RoleLog');
	list['message'] = await MessageLog.keys();
	list['member'] = await MemberLog.keys();
	list['role'] = await RoleLog.keys();
	const subcommand = interaction.options.getSubcommand();
	switch (subcommand) {
		case 'member':
			{
				const channel = interaction.channel as TextBasedChannel;
				const guild = interaction.guild as Guild;
				const serverId = guild.id;
				await MemberLog.set(serverId, channel.id)
					.then(async () => {
						list['member'] = await MemberLog.keys();
						interaction.reply(embeds.saveSuccess);
					})
					.catch((err) => {
						interaction.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		case 'message':
			{
				const channel = interaction.channel as TextBasedChannel;
				const guild = interaction.guild as Guild;
				const serverId = guild.id;
				await MessageLog.set(serverId, channel.id)
					.then(async () => {
						list['message'] = await MessageLog.keys();
						interaction.reply(embeds.saveSuccess);
					})
					.catch((err) => {
						interaction.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		case 'role':
			{
				const channel = interaction.channel as TextBasedChannel;
				const guild = interaction.guild as Guild;
				const serverId = guild.id;
				await RoleLog.set(serverId, channel.id)
					.then(async () => {
						list['role'] = await RoleLog.keys();
						interaction.reply(embeds.saveSuccess);
					})
					.catch((err) => {
						interaction.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		case 'stop': {
			const types = interaction.options.getString('type');
			switch (types) {
				case 'member':
					{
						const guild = interaction.guild as Guild;
						const serverId = guild.id;
						const data = await MemberLog.get(serverId);
						if (!data) return interaction.reply(embeds.Empty);
						await MemberLog.delete(serverId)
							.then(async () => {
								list['member'] = await MemberLog.keys();
								interaction.reply(embeds.deleteSuccess);
							})
							.catch((err) => {
								interaction.reply(embeds.defaultError);
								console.error(err);
							});
					}
					break;
				case 'message':
					{
						const guild = interaction.guild as Guild;
						const serverId = guild.id;
						const data = await MessageLog.get(serverId);
						if (!data) return interaction.reply(embeds.Empty);
						await MessageLog.delete(serverId)
							.then(async () => {
								list['message'] = await MessageLog.keys();
								interaction.reply(embeds.deleteSuccess);
							})
							.catch((err) => {
								interaction.reply(embeds.defaultError);
								console.error(err);
							});
					}
					break;
				case 'role':
					{
						const guild = interaction.guild as Guild;
						const serverId = guild.id;
						const data = await RoleLog.get(serverId);
						if (!data) return interaction.reply(embeds.Empty);
						await RoleLog.delete(serverId)
							.then(async () => {
								list['role'] = await RoleLog.keys();
								interaction.reply(embeds.deleteSuccess);
							})
							.catch((err) => {
								interaction.reply(embeds.defaultError);
								console.error(err);
							});
					}
					break;
			}
			break;
		}
		default:
			interaction.reply(embeds.logHelp);
			break;
	}
}
