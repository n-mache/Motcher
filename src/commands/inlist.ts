import { Message } from 'discord.js';
import { writeFileSync } from 'fs';

export async function inlistCommand(message: Message) {
	if (message.author.id !== process.env.OWNER_ID) return message.react('❓');
	const guildList = [] as string[];
	message.client.guilds.cache.forEach((guild) => {
		guildList.push(`${guild.name} : ${guild.id}`);
	});
	const fileName = 'guild-list.txt';
	writeFileSync(fileName, guildList.join('\n'));
	message.reply({
		files: [
			{
				attachment: fileName,
				name: fileName
			}
		]
	});
}
