import { embeds } from '../embeds';
import { PermissionsBitField, ChatInputCommandInteraction, GuildMember } from 'discord.js';

export async function kickCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.member?.permissions.has(PermissionsBitField.Flags.KickMembers))
		return interaction.reply('コマンドを使用する権限がありません。');
	if (!interaction.guild?.members.me?.permissions.has(PermissionsBitField.Flags.KickMembers))
		return interaction.reply(embeds.kickPermissionError);
	const member = interaction.options.getMember('member') as GuildMember;
	if (!member) return interaction.reply(embeds.kickHelp);
	member
		.kick()
		.then(() => {
			interaction.reply(embeds.kickSuccess);
		})
		.catch(() => {
			interaction.reply(embeds.kickError);
		});
}
