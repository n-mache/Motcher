import { aboutCommand } from './about';
import { addroleCommand } from './addrole';
import { avatarCommand } from './avatar';
import { banCommand } from './ban';
import { banlistCommand } from './banlist';
import { bannerCommand } from './banner';
import { botinviteCommand } from './botinvite';
import { clearCommand } from './clear';
import { deletejoinCommand } from './deletejoin';
import { deleteleaveCommand } from './deleteleave';
import { helpCommand } from './help';
import { inlistCommand } from './inlist';
import { inviteCommand } from './invite';
import { joinmsgCommand } from './joinmsg';
import { kickCommand } from './kick';
import { leavemsgCommand } from './leavemsg';
import { mcskinCommand } from './mcskin';
import { mcstatusCommand } from './mcstatus';
import { memberlogCommand } from './memberlog';
import { memberlogstopCommand } from './memberlogstop';
import { msglogCommand } from './msglog';
import { msglogstopCommand } from './msglogstop';
import { pingCommand } from './ping';
import { pollCommand } from './poll';
import { remroleCommand } from './remrole';
import { resdeleteCommand } from './resdelete';
import { resnowCommand } from './resnow';
import { responseCommand } from './response';
import { restartCommand } from './restart';
import { rolelogCommand } from './rolelog';
import { rolelogstopCommand } from './rolelogstop';
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
	addrole: addroleCommand,
	avatar: avatarCommand,
	ban: banCommand,
	banlist: banlistCommand,
	banner: bannerCommand,
	botinvite: botinviteCommand,
	clear: clearCommand,
	deletejoin: deletejoinCommand,
	deleteleave: deleteleaveCommand,
	inlist: inlistCommand,
	invite: inviteCommand,
	joinmsg: joinmsgCommand,
	kick: kickCommand,
	leavemsg: leavemsgCommand,
	mcskin: mcskinCommand,
	mcstatus: mcstatusCommand,
	memberlog: memberlogCommand,
	memberlogstop: memberlogstopCommand,
	msglog: msglogCommand,
	msglogstop: msglogstopCommand,
	ping: pingCommand,
	poll: pollCommand,
	remrole: remroleCommand,
	resdelete: resdeleteCommand,
	resnow: resnowCommand,
	response: responseCommand,
	restart: restartCommand,
	rolelog: rolelogCommand,
	rolelogstop: rolelogstopCommand,
	run: runCommand,
	script: scriptCommand,
	search: searchCommand,
	server: serverCommand,
	status: statusCommand,
	timeout: timeoutCommand,
	untimeout: untimeoutCommand,
	user: userCommand
};
