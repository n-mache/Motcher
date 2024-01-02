import { embeds } from '../embeds';
import { ChatInputCommandInteraction, PermissionsBitField, EmbedBuilder } from 'discord.js';

export async function banlistCommand(interaction: ChatInputCommandInteraction) {
	if (!interaction.guild?.members.me?.permissions.has(PermissionsBitField.Flags.BanMembers))
		return interaction.reply(embeds.banlistPermissionError);
	await interaction.guild.bans
		.fetch()
		.then((bans) => {
			const embed = new EmbedBuilder()
				.setTitle('Banned Users')
				.setDescription(bans.map((ban) => ban.user.username).join('\n') || 'none')
				.setColor('#ff0000');
			interaction.reply({ embeds: [embed] });
		})
		.catch(() => {
			interaction.reply(embeds.banlistError);
		});
	return;
}
