import { EmbedBuilder, Client } from 'discord.js';

export async function onError(client: Client, error: Error) {
	const err = new EmbedBuilder()
		.setTitle(`**${error}**`)
		.setColor('#ff0000')
		.setDescription('```js\n' + error.stack + '```')
		.setTimestamp();
	const channel = await client.channels.fetch('1122130976823316511');
	if (!channel?.isTextBased()) return;
	channel?.send({
		content: '<@895050958441160734>',
		embeds: [err]
	});
}
