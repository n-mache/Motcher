import { Client, version } from 'discord.js';

export function onReady(client: Client) {
	console.log(`Logged in as ${client.user?.tag}`);
	client.user?.setActivity('mc!help | Created By CH Products');
	console.table({
		'Bot User': client.user?.tag,
		'Guild(s)': client.guilds.cache.size + ' Servers',
		Watching: client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) + ' Members',
		'Discord.js': version,
		'Node.js': process.version,
		Plattform: process.platform + ' | ' + process.arch,
		Memory:
			(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) +
			'MB | ' +
			(process.memoryUsage().rss / 1024 / 1024).toFixed(2) +
			'MB'
		// Quote from: https://github.com/Nich87/Faith
	});

	const activities = ['mc!help Created By CH Products', `${client.guilds.cache.size} Servers | ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users`,];

	let currentActivityIndex = 0;

	setInterval(() => {
		const nextActivityIndex = (currentActivityIndex + 1) % activities.length;
		const nextActivity = activities[nextActivityIndex];

		client.user?.setActivity(nextActivity);

		currentActivityIndex = nextActivityIndex;
	}, 10000);
}
