import { exec } from 'child_process';
import { Message } from 'discord.js';

export async function scriptCommand(message: Message) {
	if (message.author.id !== process.env.OWNER_ID) return message.react('❌');
	const cmd = message.content.replace('mc!script ', '');
	exec(cmd, (error, stdout, stderr) => {
		if (error) {
			message.reply(`Error: ${error}`);
			return;
		}
		message.reply(`stdout: ${stdout}`);
		message.reply(`stderr: ${stderr}`);
	});
}
