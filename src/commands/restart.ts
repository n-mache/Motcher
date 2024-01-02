import { Message } from 'discord.js';

export async function restartCommand(message: Message) {
	if (message.author.id !== '895050958441160734') return;
	await message.react('✅');
	process.exit();
}
