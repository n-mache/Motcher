import { embeds } from '../embeds';
import { ChatInputCommandInteraction } from 'discord.js';

export async function aboutCommand(interaction: ChatInputCommandInteraction) {
	interaction.reply(embeds.about);
	return;
}
