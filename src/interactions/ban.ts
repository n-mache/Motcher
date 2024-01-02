import { embeds } from '../embeds';
import { ChatInputCommandInteraction, GuildMember, PermissionsBitField } from 'discord.js';

export async function banCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.member?.permissions.has(PermissionsBitField.Flags.BanMembers))
		return interaction.reply(embeds.PermissionError);
	if (!interaction.guild?.members.me?.permissions.has(PermissionsBitField.Flags.BanMembers))
		return interaction.reply(embeds.banPermissionError);
	const member = interaction.options.getMember('member') as GuildMember;
	if (!member) return interaction.reply(embeds.banHelp);
	member
		.ban()
		.then(() => {
			interaction.reply(embeds.banSuccess);
		})
		.catch(() => {
			interaction.reply(embeds.banError);
		});
	return;
}
