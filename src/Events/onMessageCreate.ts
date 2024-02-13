import { commands } from '../commands';
import { bannedUsers, bannedServers, list } from '../index';
import { connect, Database } from 'aurora-mongo';
import { Message, PermissionsBitField, Awaitable, GuildTextBasedChannel, Guild } from 'discord.js';
import { config } from 'dotenv';

config();

const prefix = 'mt!';

export async function onMessageCreate(message: Message): Promise<Awaitable<void>> {
	if (bannedUsers.includes(message.author.id)) return;
	if (!message.guild) {
		if (message.author.id === message.client.user.id) return;
		const channel = await message.client.channels.fetch('1121348990030589963');
		const attachment = message.attachments.first();
		if (!channel?.isTextBased()) return;
		channel
			.send({
				content: message.content
					? `${message.content}\n(${message.author.id} | ${message.author.username})`
					: `${message.author.id} | (${message.author.username})`,
				files: attachment
					? [
							{
								attachment: attachment.url,
								name: attachment.name
							}
						]
					: undefined
			})
			.catch((err) => {
				channel.send(err.toString());
			});
		return;
	}
	if (
		message.author.bot ||
		message.guild?.members.me?.communicationDisabledUntil !== null ||
		!message.guild.members.me.permissionsIn(message.channel as GuildTextBasedChannel).has(PermissionsBitField.Flags.SendMessages) ||
		bannedServers.includes(message.guild.id)
	)
		return;
	await connect(process.env.MONGO_URL!);
	const Response = new Database('Response');
	list['response'] = await Response.keys();
	const matchingKeys = list['response'].filter((key) => key.split(',')[0] === (message.guild as Guild).id);
	const serverData: { [key: string]: string } = {};
	await Promise.all(
		matchingKeys.map(async (key) => {
			const value = await Response.get(key);
			serverData[key] = value;
		})
	);
	for (const key in serverData) {
		const regex_matched = false;
		try {
			if (key.split(',')[1].startsWith('r/') && key.split(',')[1].endsWith('/')) {
				if (message.content.match(key.split(',')[1].replace('r','')) !== null) {
					regex_matched = true;
				}
			}
		}
		if (message.content.includes(key.split(',')[1]) || regex_matched) {
			const response = serverData[key];
			message.channel.send(response);
		}
	}
	if (!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/) as string[];
	const commandName = args.shift()?.toLowerCase();
	if (commands[commandName] !== undefined){
	    	commands[commandName](message);
	}else{
    		message.reply('存在しないコマンドです。');
	}
}
