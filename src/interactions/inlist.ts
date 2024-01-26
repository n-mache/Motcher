import { ChatInputCommandInteraction } from 'discord.js';
import { writeFileSync } from 'fs';

export async function inlistCommand(interaction: ChatInputCommandInteraction) {
	if (interaction.user.id !== process.env.OWNER_ID) return interaction.reply({ content: 'このコマンドは開発者のみ使用できます。', ephemeral: true });
	const guildList = [] as string[];
	interaction.client.guilds.cache.forEach((guild) => {
		guildList.push(`${guild.name} : ${guild.id}`);
	});
	const fileName = 'guild-list.txt';
	writeFileSync(fileName, guildList.join('\n'));
	interaction.reply({
		files: [
			{
				attachment: fileName,
				name: fileName
			}
		]
	});
}
