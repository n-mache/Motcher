import { EmbedBuilder, Client } from 'discord.js';

export async function onError(client: Client, error: Error) {
	const err = new EmbedBuilder()
		.setTitle(`**${error}**`)
		.setColor('#ff0000')
		.setDescription('```js\n' + error.stack + '```')
		.setTimestamp();
	const channel = await client.channels.fetch(process.env.DEBUG_CHANNEL);
	if (!channel?.isTextBased()) return;
	channel?.send({
		content: `<@${process.env.OWNER_ID}>`,
		embeds: [err]
	});
}
