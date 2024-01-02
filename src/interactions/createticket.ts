import {
	ButtonInteraction,
	PermissionsBitField,
	Guild,
	ChannelType,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	TextChannel
} from 'discord.js';

export async function createticketCommand(interaction: ButtonInteraction) {
	if (!interaction.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ManageChannels))
		return interaction.reply({
			content: 'チャンネルを作成する権限がありません。サーバーオーナーに問い合わせてください。',
			ephemeral: true
		});
	const guild = interaction.guild as Guild;
	const existingChannels = guild.channels.cache.filter(
		(c) =>
			c.type === ChannelType.GuildText &&
			c.name === `ticket-${interaction.user.username.replace('#', '').toLowerCase()}`
	);
	if (existingChannels.size > 0) {
		return interaction.reply({
			content: 'すでにチケットを作成しています。\nもう一度作成したい場合は既存のチケットを一度閉じてください。',
			ephemeral: true
		});
	}
	try {
		const channel = interaction.channel as TextChannel;
		const createdChannel = await guild.channels.create({
			name: `Ticket-${interaction.user.username}`,
			parent: channel.parent,
			permissionOverwrites: [
				{
					id: interaction.user.id,
					allow: [
						PermissionsBitField.Flags.ViewChannel,
						PermissionsBitField.Flags.SendMessages,
						PermissionsBitField.Flags.AttachFiles,
						PermissionsBitField.Flags.ReadMessageHistory
					]
				},
				{
					id: interaction.guild.roles.everyone,
					deny: [PermissionsBitField.Flags.ViewChannel]
				}
			]
		});
		const Closeticket = new ButtonBuilder()
			.setCustomId('closeticket')
			.setLabel('Close Ticket')
			.setStyle(ButtonStyle.Danger);
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(Closeticket);
		await createdChannel.send({
			content: `${interaction.user}さん、チケットへようこそ！\nこのチケットを閉じるときは下のボタンを押してください。`,
			components: [row]
		});
		await interaction.reply({ content: `新しいチケットを作成しました。${createdChannel}`, ephemeral: true });
	} catch (error) {
		console.error(error);
	}
}
