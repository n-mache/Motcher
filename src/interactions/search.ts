import { embeds } from '../embeds';
import axios from 'axios';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { config } from 'dotenv';

config();

export async function searchCommand(interaction: ChatInputCommandInteraction) {
	const query = interaction.options.getString('query') as string;
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
				interaction.reply({ content: '検索結果が見つかりませんでした。', ephemeral: true });
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

			interaction.reply({
				content: `「${query}」の検索結果`,
				embeds: [embed]
			});
		})
		.catch((error) => {
			console.error(error);
			interaction.reply(embeds.searchError);
		});
}
