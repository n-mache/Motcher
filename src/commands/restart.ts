import { Message } from 'discord.js';

export async function restartCommand(message: Message) {
	if (message.author.id !== process.env.OWNER_ID) return;
	await message.react('✅');
	process.exit();
}
