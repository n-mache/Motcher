import { embeds } from '../embeds';
import axios from 'axios';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export async function mcstatusCommand(interaction: ChatInputCommandInteraction) {
	const mcServerIp = interaction.options.getString('address');
	const mcServerPort = interaction.options.getString('port') ?? '25565';
	const url = `https://mcapi.us/server/status?ip=${mcServerIp}&port=${mcServerPort}`;
	if (!mcServerIp) return interaction.reply(embeds.mcstatusHelp);
	axios
		.get(url)
		.then((response) => {
			const data = response.data;
			const status = data.status as string;
			const online = (data.online as number).toString();
			const servername = data.server.name as string;
			const maxplayer = (data.players.max as number).toString();
			const playerCount = (data.players.now as number).toString();
			const embed = new EmbedBuilder()
				.setColor('#0099ff')
				.setTitle(`${mcServerIp}のステータス`)
				.addFields(
					{ name: 'status', value: status },
					{ name: 'online', value: online },
					{ name: 'サーバーのバージョン', value: servername },
					{ name: '最大プレイヤー数', value: maxplayer },
					{ name: 'プレイヤー数', value: playerCount }
				);
			interaction.reply({ embeds: [embed] });
		})
		.catch(() => {
			interaction.reply(embeds.mcstatusError);
		});
}
