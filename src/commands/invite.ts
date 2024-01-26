import { embeds } from '../embeds';
import { ChannelType, Message, PermissionsBitField } from 'discord.js';

export async function inviteCommand(message: Message) {
	if (!message.member?.permissions.has(PermissionsBitField.Flags.CreateInstantInvite)) return message.reply(embeds.PermissionError);
	if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.CreateInstantInvite)) return message.reply(embeds.invitePermissionError);
	if (message.channel.type !== ChannelType.GuildText) return;
	message.channel
		.createInvite()
		.then((invite) => {
			message.reply(invite.url);
		})
		.catch(() => {
			message.reply(embeds.inviteError);
		});
}
