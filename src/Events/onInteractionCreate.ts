import { bannedUsers, bannedServers } from '../index';
import { interactions } from '../interactions';
import { BaseInteraction, Awaitable } from 'discord.js';
import { config } from 'dotenv';

config();

export async function onInteractionCreate(interaction: BaseInteraction): Promise<Awaitable<void>> {
	if (interaction.isAutocomplete()) {
		switch (interaction.commandName) {
			case 'resdelete':
				interactions.responseComplete(interaction);
				break;
			default:
				break;
		}
	}
	if (interaction.isButton()) {
		switch (interaction.customId) {
			case 'createticket':
				interactions.createticket(interaction);
				break;
			case 'closeticket':
				interactions.closeticket(interaction);
				break;
			case 'yes':
				interactions.yes(interaction);
				break;
			case 'no':
				interactions.no(interaction);
				break;
			default:
				break;
		}
	}
	if (!interaction.isChatInputCommand()) return;
	if (!interaction.guild) {
		interaction.reply('このコマンドはDMでは使用できません。');
		return;
	}
	if (bannedServers.includes(interaction.guild.id) || bannedUsers.includes(interaction.user.id)) return;
	switch (interaction.commandName) {
		case 'about':
			interactions.about(interaction);
			break;
		case 'addrole':
			interactions.addrole(interaction);
			break;
		case 'avatar':
			interactions.avatar(interaction);
			break;
		case 'ban':
			interactions.ban(interaction);
			break;
		case 'banlist':
			interactions.banlist(interaction);
			break;
		case 'banner':
			interactions.banner(interaction);
			break;
		case 'clear':
			interactions.clear(interaction);
			break;
		case 'deletejoin':
			interactions.deletejoin(interaction);
			break;
		case 'deleteleave':
			interactions.deleteleave(interaction);
			break;
		case 'help':
			interactions.help(interaction);
			break;
		case 'inlist':
			interactions.inlist(interaction);
			break;
		case 'invite':
			interactions.invite(interaction);
			break;
		case 'joinmsg':
			interactions.joinmsg(interaction);
			break;
		case 'kick':
			interactions.kick(interaction);
			break;
		case 'leavemsg':
			interactions.leavemsg(interaction);
			break;
		case 'mcskin':
			interactions.mcskin(interaction);
			break;
		case 'mcstatus':
			interactions.mcstatus(interaction);
			break;
		case 'memberlog':
			interactions.memberlog(interaction);
			break;
		case 'memberlogstop':
			interactions.memberlogstop(interaction);
			break;
		case 'msglog':
			interactions.msglog(interaction);
			break;
		case 'msglogstop':
			interactions.msglogstop(interaction);
			break;
		case 'ping':
			interactions.ping(interaction);
			break;
		case 'remrole':
			interactions.remrole(interaction);
			break;
		case 'resdelete':
			interactions.resdelete(interaction);
			break;
		case 'resnow':
			interactions.resnow(interaction);
			break;
		case 'response':
			interactions.response(interaction);
			break;
		case 'rolelog':
			interactions.rolelog(interaction);
			break;
		case 'rolelogstop':
			interactions.rolelogstop(interaction);
			break;
		case 'search':
			interactions.search(interaction);
			break;
		case 'server':
			interactions.server(interaction);
			break;
		case 'status':
			interactions.status(interaction);
			break;
		case 'timeout':
			interactions.timeout(interaction);
			break;
		case 'untimeout':
			interactions.untimeout(interaction);
			break;
		case 'user':
			interactions.user(interaction);
			break;
		default:
			interaction.reply({ content: 'そのコマンドは存在しません。', ephemeral: true });
			break;
	}
}
