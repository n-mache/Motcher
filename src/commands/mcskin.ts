import { embeds } from '../embeds';
import { Message, EmbedBuilder } from 'discord.js';

export async function mcskinCommand(message: Message) {
	const name = message.content.split(' ')[1];
	if (!name) return message.reply(embeds.mcskinHelp);
	const embed = new EmbedBuilder()
		.setTitle(`${name}のスキン`)
		.setColor('#0099ff')
		.setImage(`https://minotar.net/armor/body/${name}/100.png`)
		.setThumbnail(`https://minotar.net/skin/${name}`);
	message.reply({ embeds: [embed] });
}
