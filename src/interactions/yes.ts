import { ButtonInteraction, TextBasedChannel } from 'discord.js';

export async function yesCommand(interaction: ButtonInteraction) {
	await interaction.reply('5秒後にこのチケットを閉じます...');
	try {
		setTimeout(() => {
			const channel = interaction.channel as TextBasedChannel;
			channel.delete();
		}, 5000);
	} catch (error) {
		console.error(error);
	}
}
