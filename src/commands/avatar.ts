import { Message, EmbedBuilder } from 'discord.js';

export async function avatarCommand(message: Message) {
	const targetUser = message.mentions.users.first() || message.author;
	const avatarURL = targetUser.displayAvatarURL({ size: 1024, extension: 'png' });
	const embed = new EmbedBuilder().setColor('#0099FF').setTitle(`${targetUser.username}のアバター`).setImage(avatarURL);
	message.reply({ embeds: [embed] });
	return;
}
