import { embeds } from '../embeds';
import {
	ChannelType,
	ChatInputCommandInteraction,
	GuildMember,
	PermissionsBitField,
	TextBasedChannel
} from 'discord.js';

export async function inviteCommand(interaction: ChatInputCommandInteraction) {
	if (!(interaction.member instanceof GuildMember)) return;
	if (!interaction.member?.permissions.has(PermissionsBitField.Flags.CreateInstantInvite))
		return interaction.reply(embeds.PermissionError);
	if (!interaction.guild?.members.me?.permissions.has(PermissionsBitField.Flags.CreateInstantInvite))
		return interaction.reply(embeds.invitePermissionError);
	const channel = interaction.channel as TextBasedChannel;
	if (channel.type !== ChannelType.GuildText) return;
	channel
		.createInvite()
		.then((invite) => {
			interaction.reply(invite.url);
		})
		.catch(() => {
			interaction.reply(embeds.inviteError);
		});
}
