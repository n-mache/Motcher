import { embeds } from '../embeds';
import translate from 'deepl';
import { EmbedBuilder, MessageContextMenuCommandInteraction } from 'discord.js';
import cron from 'node-cron';
const userJaCounts = new Map<string, number>();
const maxCharsPerDay = 3000;

cron.schedule('0 0 0 * * *', () => {
	userJaCounts.clear();
});

export async function ja_translateCommand(interaction: MessageContextMenuCommandInteraction) {
	if (!interaction.targetMessage.content) return interaction.reply(embeds.translateError);

    const currentChars = userJaCounts.get(interaction.user.id) || 0;
    const newChars = currentChars + interaction.targetMessage.content.length;

    if (newChars > maxCharsPerDay) {
        return interaction.reply(embeds.translateLimit);
    }

    userJaCounts.set(interaction.user.id, newChars);

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
