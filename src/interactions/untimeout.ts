import { embeds } from '../embeds';
import { PermissionsBitField, ChatInputCommandInteraction, GuildMember } from 'discord.js';

export async function untimeoutCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.member?.permissions.has(PermissionsBitField.Flags.ModerateMembers))
		return interaction.reply('このコマンドを使用する権限がありません');
	if (!interaction.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ModerateMembers))
		return interaction.reply(embeds.timeoutPermissionError);
	const member = interaction.options.getMember('member') as GuildMember;
	if (!member) return interaction.reply(embeds.untimeoutHelp);
	if (member.communicationDisabledUntil !== null) {
		member
			.timeout(null)
			.then(() => {
				interaction.reply(embeds.untimeoutSuccess);
			})
			.catch(() => {
				interaction.reply(embeds.untimeoutError);
			});
	} else {
		interaction.reply(embeds.untimeoutNo);
	}
}
