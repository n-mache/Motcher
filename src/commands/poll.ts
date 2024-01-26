import { embeds } from '../embeds';
import { Message, EmbedBuilder } from 'discord.js';

const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

export async function pollCommand(message: Message) {
	const args = message.content.split(' ');
	const [title, ...options] = args.slice(1);
	if (!title || options.length === 0) return message.reply(embeds.pollHelp);
	if (options.length > 10) return message.reply('選択肢は10個までです。');
	const embed = new EmbedBuilder().setTitle(title).setDescription(options.map((option, index) => `${reactions[index]} ${option}`).join('\n'));

	const pollMessage = await message.reply({ embeds: [embed] });
	options.forEach(async (_, index) => {
		await pollMessage.react(reactions[index]);
	});
}
