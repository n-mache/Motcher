import { ServerMsgData } from '../Utils/ServerData';
import { embeds } from '../embeds';
import { Guild, ChatInputCommandInteraction, GuildMember, TextBasedChannel } from 'discord.js';
import { readFileSync, writeFile } from 'fs';

export async function msglogCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	const channel = interaction.channel as TextBasedChannel;
	const guild = interaction.guild as Guild;
	const serverId = guild.id;
	const rawData = readFileSync('./database/msglogs.json', 'utf-8');
	const data: Record<string, ServerMsgData> = JSON.parse(rawData);
	data[serverId] = {
		channelId: channel.id
	};
	writeFile('./database/msglogs.json', JSON.stringify(data, null, 2), (err) => {
		if (err) {
			interaction.reply(embeds.defaultError);
		} else {
			interaction.reply(embeds.saveSuccess);
		}
	});
}
