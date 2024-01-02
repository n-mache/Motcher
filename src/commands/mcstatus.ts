import { embeds } from '../embeds';
import axios from 'axios';
import { Message, EmbedBuilder } from 'discord.js';

export async function mcstatusCommand(message: Message) {
	const mcServerIp = message.content.split(' ')[1];
	const mcServerPort = message.content.split(' ')[2] ? message.content.split(' ')[2] : '25565';
	const url = `https://mcapi.us/server/status?ip=${mcServerIp}&port=${mcServerPort}`;
	if (!mcServerIp) return message.reply(embeds.mcstatusHelp);
	axios
		.get(url)
		.then((response) => {
			const data = response.data;
			const status = data.status;
			const online = data.online.toString();
			const servername = data.server.name;
			const maxplayer = data.players.max.toString();
			const playerCount = data.players.now.toString();
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
			message.reply({ embeds: [embed] });
		})
		.catch(() => {
			message.reply(embeds.mcstatusError);
		});
}
