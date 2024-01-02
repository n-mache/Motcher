import { aboutCommand } from './about';
import { addroleCommand } from './addrole';
import { avatarCommand } from './avatar';
import { banCommand } from './ban';
import { banlistCommand } from './banlist';
import { bannerCommand } from './banner';
import { clearCommand } from './clear';
import { closeticketCommand } from './closeticket';
import { createticketCommand } from './createticket';
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
import { noCommand } from './no';
import { pingCommand } from './ping';
import { remroleCommand } from './remrole';
import { resdeleteCommand } from './resdelete';
import { resnowCommand } from './resnow';
import { responseCommand } from './response';
import { rolelogCommand } from './rolelog';
import { rolelogstopCommand } from './rolelogstop';
import { searchCommand } from './search';
import { serverCommand } from './server';
import { statusCommand } from './status';
import { timeoutCommand } from './timeout';
import { untimeoutCommand } from './untimeout';
import { userCommand } from './user';
import { yesCommand } from './yes';
import { responseComplete } from './response_complete';

export const interactions = {
	help: helpCommand,
	about: aboutCommand,
	addrole: addroleCommand,
	avatar: avatarCommand,
	ban: banCommand,
	banlist: banlistCommand,
	banner: bannerCommand,
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
	remrole: remroleCommand,
	resdelete: resdeleteCommand,
	resnow: resnowCommand,
	response: responseCommand,
	rolelog: rolelogCommand,
	rolelogstop: rolelogstopCommand,
	search: searchCommand,
	server: serverCommand,
	status: statusCommand,
	timeout: timeoutCommand,
	untimeout: untimeoutCommand,
	user: userCommand,
	createticket: createticketCommand,
	closeticket: closeticketCommand,
	yes: yesCommand,
	no: noCommand,
	responseComplete: responseComplete,
};
