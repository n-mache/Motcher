import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import osu from 'node-os-utils';
import os from 'os';

export async function statusCommand(interaction: ChatInputCommandInteraction) {
	const guildCount = interaction.client.guilds.cache.size;
	const userCount = interaction.client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c);
	const ping = interaction.client.ws.ping;
	const totalMem = os.totalmem();
	const freeMem = os.freemem();
	const usedMem = totalMem - freeMem;
	const usedMemPercentage = Math.round((usedMem / totalMem) * 10000) / 100;
	const cpu = osu.cpu;
	const cpuUsagePercentage = parseFloat((await cpu.usage()).toFixed(2));
	const barLength = 20;
	const usedLength = Math.max(1, Math.round(barLength * (cpuUsagePercentage / 100)));
	const cpuBar = '```[' + '='.repeat(usedLength) + ' '.repeat(barLength - usedLength) + ']```';
	const memBarLength = 20;
	const memUsedLength = Math.round(memBarLength * (usedMemPercentage / 100));
	const memBar = '```[' + '='.repeat(memUsedLength) + ' '.repeat(memBarLength - memUsedLength) + ']```';
	const statusEmbed = new EmbedBuilder()
		.setTitle('Botのステータス')
		.setColor('#0099ff')
		.addFields(
			{ name: '現在のステータス', value: `サーバー数: ${guildCount}\nユーザー数: ${userCount}\nPing: ${ping}ms` },
			{ name: 'CPU使用率', value: `${cpuUsagePercentage}%\n${cpuBar}` },
			{ name: `メモリ使用率`, value: `${usedMemPercentage}%\n${memBar}` }
		);
	interaction.reply({ embeds: [statusEmbed] });
}
