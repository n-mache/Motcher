import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export async function avatarCommand(interaction: ChatInputCommandInteraction) {
	const targetUser = interaction.options.getUser('user') ?? interaction.user;
	const avatarURL = targetUser.displayAvatarURL({ size: 1024, extension: 'png' });
	const embed = new EmbedBuilder().setColor('#0099FF').setTitle(`${targetUser.username}のアバター`).setImage(avatarURL);
	interaction.reply({ embeds: [embed] });
	return;
}
