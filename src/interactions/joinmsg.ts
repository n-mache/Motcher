import { ServerJoinData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Guild, ChatInputCommandInteraction, PermissionsBitField, GuildMember, TextBasedChannel } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function joinmsgCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.member?.permissions.has(PermissionsBitField.Flags.Administrator))
		return interaction.reply(embeds.PermissionError);
	const detail = interaction.options.getString('detail');
	const channel = interaction.channel as TextBasedChannel;
	const guild = interaction.guild as Guild;
	const serverId = guild.id;
	if (!detail) return interaction.reply(embeds.joinmsgHelp);
	const rawData = readFileSync('./database/join_messages.json', 'utf-8');
	const data: Record<string, ServerJoinData> = JSON.parse(rawData);
	data[serverId] = {
		joinMessage: detail,
		channelId: channel.id
	};
	writeFile('./', JSON.stringify(data, null, 2), (err) => {
		if (err) {
			interaction.reply(embeds.defaultError);
		} else {
			interaction.reply(embeds.saveSuccess);
		}
	});
}
