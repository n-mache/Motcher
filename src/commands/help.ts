import { embeds } from '../embeds';
import { Message } from 'discord.js';

export async function helpCommand(message: Message) {
	message.reply(embeds.help);
	return;
}
