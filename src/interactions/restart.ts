import { ChatInputCommandInteraction } from 'discord.js';

export async function restartCommand(interaction: ChatInputCommandInteraction) {
	if (interaction.user.id !== '895050958441160734')
		return interaction.reply({ content: 'このコマンドは開発者のみが使用できます。', ephemeral: true });
	await interaction.client.destroy();
	process.exit();
}
