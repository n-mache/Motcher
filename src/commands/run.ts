import { Message } from 'discord.js';

export async function runCommand(message: Message) {
	if (message.author.id !== '895050958441160734') return message.react('❓');
	const code = message.content
		.slice(`mc!run`.length)
		.trim()
		.replace(/^```(js)?/, '')
		.replace(/```$/, '')
		.trim();
	if (!code) {
		return message.reply('?????????:middle_finger:');
	}
	(async function () {
		const asyncEval = async (code: string) => {
			return await eval(`(async () => {${code}})()`);
		};
		await asyncEval(code)
			.then(() => {
				message.react('✅');
			})
			.catch((err) => {
				message.reply(`${err}`);
				message.react('❎');
			});
	})();
}
