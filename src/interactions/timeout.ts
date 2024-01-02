import { embeds } from '../embeds';
import { ChatInputCommandInteraction, GuildMember, PermissionsBitField } from 'discord.js';

export async function timeoutCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.member?.permissions.has(PermissionsBitField.Flags.ModerateMembers))
		return interaction.reply(embeds.PermissionError);
	if (!interaction.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ModerateMembers))
		return interaction.reply(embeds.timeoutPermissionError);
	const member = interaction.options.getMember('member') as GuildMember;
	const time = interaction.options.getInteger('time') as number;
	if (time <= 0) return interaction.reply({ content: '0分以下は指定できません。', ephemeral: true });
	member
		.timeout(time * 60000)
		.then(() => {
			interaction.reply(embeds.timeoutSuccess);
		})
		.catch(() => {
			interaction.reply(embeds.timeoutError);
		});
}
