import { ServerRoleData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { ChatInputCommandInteraction, PermissionsBitField, Guild, GuildMember, TextBasedChannel } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function rolelogCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.member?.permissions.has(PermissionsBitField.Flags.ManageChannels))
		return interaction.reply(embeds.PermissionError);
	const channel = interaction.channel as TextBasedChannel;
	const guild = interaction.guild as Guild;
	const serverId = guild.id;
	const rawData = readFileSync('./database/rolelogs.json', 'utf-8');
	const data: Record<string, ServerRoleData> = JSON.parse(rawData);
	data[serverId] = {
		channelId: channel.id
	};
	writeFile('./database/rolelogs.json', JSON.stringify(data, null, 2), (err) => {
		if (err) {
			interaction.reply(embeds.defaultError);
			console.error(err);
		} else {
			interaction.reply(embeds.saveSuccess);
		}
	});
}
