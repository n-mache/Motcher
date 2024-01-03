import { embeds } from '../embeds';
import { ChatInputCommandInteraction, GuildMember, PermissionsBitField, Role } from 'discord.js';

export async function roleCommand(interaction: ChatInputCommandInteraction) {
	const subcommand = interaction.options.getSubcommand(true);
	switch (subcommand) {
		case 'add': {
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
			break;
		}
		case 'remove': {
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
			break;
		}
	}
}
