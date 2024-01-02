import { embeds } from '../embeds';
import { ChatInputCommandInteraction, GuildMember, PermissionsBitField, Role } from 'discord.js';

export async function addroleCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.member?.permissions.has(PermissionsBitField.Flags.ManageRoles))
		return interaction.reply(embeds.PermissionError);
	if (!interaction.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles))
		return interaction.reply(embeds.roleAddPermissionError);
	const role = interaction.options.getRole('role') as Role;
	const member = interaction.options.getMember('member') as GuildMember;
	if (!role || !member) return interaction.reply(embeds.roleAddHelp);
	member.roles
		.add(role)
		.then(() => {
			interaction.reply(embeds.roleAddSuccess);
		})
		.catch(() => {
			interaction.reply(embeds.roleAddError);
		});
	return;
}
