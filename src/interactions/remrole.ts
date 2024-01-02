import { embeds } from '../embeds';
import { ChatInputCommandInteraction, GuildMember, PermissionsBitField, Role } from 'discord.js';

export async function remroleCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.member?.permissions.has(PermissionsBitField.Flags.ManageRoles))
		return interaction.reply(embeds.PermissionError);
	if (!interaction.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles))
		return interaction.reply(embeds.remrolePermissionError);
	const role = interaction.options.getRole('role') as Role;
	const member = interaction.options.getMember('member') as GuildMember;
	if (!role || !member) return interaction.reply(embeds.remroleHelp);
	member.roles
		.remove(role)
		.then(() => {
			interaction.reply(embeds.remroleSuccess);
		})
		.catch(() => {
			interaction.reply(embeds.remroleError);
		});
}
