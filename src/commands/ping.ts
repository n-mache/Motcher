import { Message, EmbedBuilder } from 'discord.js';

export async function pingCommand(message: Message) {
	const embed = new EmbedBuilder().setColor('#0099ff').setTitle('Pong!:ping_pong:').setDescription(`${message.client.ws.ping}ms`);
	message.reply({ embeds: [embed] });
}
