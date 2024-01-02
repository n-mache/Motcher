import { ServerMemberData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Guild, ChatInputCommandInteraction, PermissionsBitField, GuildMember } from 'discord.js';
import { readFileSync, writeFile } from 'fs';

export async function memberlogstopCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.member?.permissions.has(PermissionsBitField.Flags.ManageChannels))
		return interaction.reply(embeds.PermissionError);
	const guild = interaction.guild as Guild;
	const serverId = guild.id;
	const rawData = readFileSync('./database/memberlogs.json', 'utf-8');
	const data: Record<string, ServerMemberData> = JSON.parse(rawData);
	delete data[serverId];
	writeFile('./database/memberlogs.json', JSON.stringify(data, null, 2), (err) => {
		if (err) {
			interaction.reply(embeds.defaultError);
			console.error(err);
		} else {
			interaction.reply(embeds.deleteSuccess);
		}
	});
}
