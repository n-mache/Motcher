import { Message, EmbedBuilder } from 'discord.js';

export async function bannerCommand(message: Message) {
	const user = message.mentions.users.first() || message.author;
	const banner = user.bannerURL({ size: 1024 });
	if (!banner) return message.reply('バナーが設定されていませんでした。');
	const embed = new EmbedBuilder().setTitle(`${user.username}のバナー`).setImage(banner).setColor('#0099ff');
	message.reply({ embeds: [embed] });
	return;
}
