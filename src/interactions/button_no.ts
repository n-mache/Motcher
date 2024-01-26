import { ButtonInteraction } from 'discord.js';

export async function noCommand(interaction: ButtonInteraction) {
	interaction.message.delete();
}
