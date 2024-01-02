import { ChannelType, Message } from 'discord.js';

export async function botinviteCommand(message: Message) {
	if (message.author.id !== '895050958441160734') return message.react('❓');
	const args = message.content.split(' ');
	if (args.length !== 2) {
		message.reply('GUILD_IDを入力してください。');
		return;
	}
	const guildId = args[1];
	const guild = message.client.guilds.cache.get(guildId);
	if (!guild) {
		message.reply('指定されたサーバーに参加していません。');
		return;
	}
	const channel = guild.channels.cache.random();
	if (!channel) return;
	if (channel.type !== ChannelType.GuildText) return;
	const invite = await channel.createInvite();
	if (!invite) return;
	message.reply(invite.url);
}
