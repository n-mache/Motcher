import { embeds } from '../embeds';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export async function mcskinCommand(interaction: ChatInputCommandInteraction) {
	const name = interaction.options.getString('name');
	if (!name) return interaction.reply(embeds.mcskinHelp);
	const embed = new EmbedBuilder()
		.setTitle(`${name}のスキン`)
		.setColor('#0099ff')
		.setImage(`https://minotar.net/armor/body/${name}/100.png`)
		.setThumbnail(`https://minotar.net/skin/${name}`);
	interaction.reply({ embeds: [embed] });
}
