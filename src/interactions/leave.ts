import { embeds } from '../embeds';
import { list } from '../index';
import { connect, Database } from 'aurora-mongo';
import { TextBasedChannel, PermissionsBitField, ChatInputCommandInteraction, GuildMember, Guild } from 'discord.js';
import { config } from 'dotenv';

config();

export async function leaveCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.member?.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply(embeds.PermissionError);
	await connect(process.env.MONGO_URL!);
	const Leave = new Database('Leave');
	list['leave'] = await Leave.keys();
	const subcommand = interaction.options.getSubcommand();
	switch (subcommand) {
		case 'message':
			{
				const detail = interaction.options.getString('message');
				const channel = interaction.channel as TextBasedChannel;
				const guild = interaction.guild as Guild;
				const serverId = guild.id;
				if (!detail) return interaction.reply(embeds.joinmsgHelp);
				await Leave.set(serverId, `${channel.id},${detail}`)
					.then(async () => {
						interaction.reply(embeds.saveSuccess);
						list['leave'] = await Leave.keys();
					})
					.catch((err) => {
						interaction.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		case 'remove':
			{
				const guild = interaction.guild as Guild;
				const serverId = guild.id;
				const data = await Leave.get(serverId);
				if (!data) return interaction.reply(embeds.Empty);
				await Leave.delete(serverId)
					.then(async () => {
						interaction.reply(embeds.deleteSuccess);
						list['leave'] = await Leave.keys();
					})
					.catch((err) => {
						interaction.reply(embeds.defaultError);
						console.error(err);
					});
			}
			break;
		default:
			interaction.reply(embeds.joinHelp);
			break;
	}
}
