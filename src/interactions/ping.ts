import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export async function pingCommand(interaction: ChatInputCommandInteraction) {
	const embed = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle('Pong!:ping_pong:')
		.setDescription(`${interaction.client.ws.ping}ms`);
	interaction.reply({ embeds: [embed] });
}
