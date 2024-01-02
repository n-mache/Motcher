import { embeds } from '../embeds';
import { Message } from 'discord.js';

export async function aboutCommand(message: Message) {
	message.reply(embeds.about);
	return;
}
