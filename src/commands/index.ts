import { aboutCommand } from './about';
import { avatarCommand } from './avatar';
import { banCommand } from './ban';
import { banlistCommand } from './banlist';
import { bannerCommand } from './banner';
import { botinviteCommand } from './botinvite';
import { clearCommand } from './clear';
import { helpCommand } from './help';
import { inlistCommand } from './inlist';
import { inviteCommand } from './invite';
import { joinCommand } from './join';
import { kickCommand } from './kick';
import { leaveCommand } from './leave';
import { logCommand } from './log';
import { mcskinCommand } from './mcskin';
import { mcstatusCommand } from './mcstatus';
import { pingCommand } from './ping';
import { pollCommand } from './poll';
import { responseCommand } from './response';
import { restartCommand } from './restart';
import { roleCommand } from './role';
import { runCommand } from './run';
import { scriptCommand } from './script';
import { searchCommand } from './search';
import { serverCommand } from './server';
import { statusCommand } from './status';
import { timeoutCommand } from './timeout';
import { untimeoutCommand } from './untimeout';
import { userCommand } from './user';

export const commands = {
	help: helpCommand,
	about: aboutCommand,
	avatar: avatarCommand,
	ban: banCommand,
	banlist: banlistCommand,
	banner: bannerCommand,
	botinvite: botinviteCommand,
	clear: clearCommand,
	inlist: inlistCommand,
	invite: inviteCommand,
	join: joinCommand,
	kick: kickCommand,
	leave: leaveCommand,
	log: logCommand,
	mcskin: mcskinCommand,
	mcstatus: mcstatusCommand,
	ping: pingCommand,
	poll: pollCommand,
	response: responseCommand,
	restart: restartCommand,
	role: roleCommand,
	run: runCommand,
	script: scriptCommand,
	search: searchCommand,
	server: serverCommand,
	status: statusCommand,
	timeout: timeoutCommand,
	untimeout: untimeoutCommand,
	user: userCommand
};
