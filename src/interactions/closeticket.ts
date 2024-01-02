import { ButtonInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export async function closeticketCommand(interaction: ButtonInteraction) {
	const Yes = new ButtonBuilder().setCustomId('yes').setLabel('Yes').setStyle(ButtonStyle.Danger);
	const No = new ButtonBuilder().setCustomId('no').setLabel('No').setStyle(ButtonStyle.Secondary);
	const row = new ActionRowBuilder<ButtonBuilder>().addComponents(Yes, No);
	await interaction.reply({ content: 'このチケットを閉じますか？', components: [row] });
}
