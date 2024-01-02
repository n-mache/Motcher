import { embeds } from '../embeds';
import {
	ChannelType,
	ChatInputCommandInteraction,
	GuildMember,
	PermissionsBitField,
	TextBasedChannel
} from 'discord.js';

export async function clearCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ManageMessages))
		return interaction.reply(embeds.clearPermissionError);
	const member = interaction.options.getMember('member') as GuildMember;
	const amount = interaction.options.getInteger('amount') as number;
	if (amount < 1 || amount > 100) {
		return interaction.reply({ content: '1から100までの数字を入力してください。', ephemeral: true });
	}
	const channel = interaction.channel as TextBasedChannel;
	const messages = await channel.messages.fetch({ limit: 100 });
	const userMessages = Array.from(messages.filter((m) => m.author.id === member.id).values()).slice(0, amount);
	if (channel.type !== ChannelType.GuildText) return;
	channel
		.bulkDelete(userMessages)
		.then(() => {
			interaction.reply(embeds.clearSuccess);
		})
		.catch(() => {
			interaction.reply(embeds.clearError);
		});
}
