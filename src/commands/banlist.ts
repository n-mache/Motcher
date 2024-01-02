import { embeds } from '../embeds';
import { Message, PermissionsBitField, EmbedBuilder } from 'discord.js';

export async function banlistCommand(message: Message) {
	if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.BanMembers))
		return message.reply(embeds.banlistPermissionError);
	await message.guild.bans
		.fetch()
		.then((bans) => {
			const embed = new EmbedBuilder()
				.setTitle('Banned Users')
				.setDescription(bans.map((ban) => ban.user.username).join('\n') || 'none')
				.setColor('#ff0000');
			message.reply({ embeds: [embed] });
		})
		.catch(() => {
			message.reply(embeds.banlistError);
		});
	return;
}
