import { embeds } from '../embeds';
import translate from 'deepl';
import { EmbedBuilder, MessageContextMenuCommandInteraction } from 'discord.js';

export async function ja_translateCommand(interaction: MessageContextMenuCommandInteraction) {
	if (!interaction.targetMessage.content) return interaction.reply(embeds.translateError);
	translate({
		text: interaction.targetMessage.content,
		target_lang: 'JA',
		auth_key: process.env.DEEPL_API_KEY!,
		free_api: true
	})
		.then((res) => {
			const embed = new EmbedBuilder()
				.setTitle('翻訳結果')
				.setDescription(res.data.translations[0].text)
				.setColor('#0099ff')
				.setFooter({ text: 'Powered by DeepL' });
			interaction.reply({ embeds: [embed] });
		})
		.catch((err) => {
			console.error(err);
			interaction.reply(embeds.translateError);
		});
}
