import { ServerLeaveData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Guild, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import { writeFile, readFileSync } from 'fs';

export async function deleteleaveCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	const guild = interaction.guild as Guild;
	const serverId = guild.id;
	const rawData = readFileSync('./database/leave_messages.json', 'utf-8');
	const data: Record<string, ServerLeaveData> = JSON.parse(rawData);
	delete data[serverId];
	writeFile('./database/leave_messages.json', JSON.stringify(data, null, 2), (err) => {
		if (err) {
			interaction.reply(embeds.defaultError);
			console.error(err);
		} else {
			interaction.reply(embeds.deleteSuccess);
		}
	});
}
