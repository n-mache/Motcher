import { embeds } from '../embeds';
import axios from 'axios';
import { Message, EmbedBuilder } from 'discord.js';
import { config } from 'dotenv';

config();

export async function searchCommand(message: Message) {
	const query = message.content.split(' ').slice(1).join(' ');
	if (!query) {
		message.reply(embeds.searchHelp);
		return;
	}
	axios
		.get('https://www.googleapis.com/customsearch/v1', {
			params: {
				key: process.env.GOOGLE_KEY,
				cx: process.env.GOOGLE_CX,
				q: query
			}
		})
		.then((response) => {
			const data = response.data;
			if (!data.items) {
				message.reply('検索結果が見つかりませんでした。');
				return;
			}
			const results = data.items.slice(0, 5);
			const embed = results.reduce(
				(
					embedBuilder: { addFields: (arg0: { name: string; value: string }) => EmbedBuilder },
					result: { title: string; snippet: string; link: string }
				) => {
					return embedBuilder.addFields({
						name: `${result.title}`,
						value: `[${result.snippet}](${result.link})`
					});
				},
				new EmbedBuilder().setColor('#0099FF')
			);

			message.reply({
				content: `「${query}」の検索結果`,
				embeds: [embed]
			});
		})
		.catch((error) => {
			console.error(error);
			message.reply('検索に失敗しました。');
		});
}
