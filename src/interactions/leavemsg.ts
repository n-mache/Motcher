import { ServerLeaveData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Guild, ChatInputCommandInteraction, PermissionsBitField, GuildMember, TextBasedChannel } from 'discord.js';
import { readFileSync, writeFile } from 'fs';

export async function leavemsgCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.member?.permissions.has(PermissionsBitField.Flags.Administrator))
		return interaction.reply(embeds.PermissionError);
	const detail = interaction.options.getString('detail') as string;
	const channel = interaction.channel as TextBasedChannel;
	const guild = interaction.guild as Guild;
	const serverId = guild.id;
	if (!detail) interaction.reply(embeds.leavemsgHelp);
	const rawData = readFileSync('./database/leave_messages.json', 'utf-8');
	const data: Record<string, ServerLeaveData> = JSON.parse(rawData);
	data[serverId] = {
		leaveMessage: detail,
		channelId: channel.id
	};
	writeFile('./database/leave_messages.json', JSON.stringify(data, null, 2), (err) => {
		if (err) {
			interaction.reply(embeds.defaultError);
		} else {
			interaction.reply(embeds.saveSuccess);
		}
	});
}
