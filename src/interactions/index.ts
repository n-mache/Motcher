import { aboutCommand } from './about';
import { avatarCommand } from './avatar';
import { banCommand } from './ban';
import { banlistCommand } from './banlist';
import { bannerCommand } from './banner';
import { noCommand } from './button_no';
import { yesCommand } from './button_yes';
import { clearCommand } from './clear';
import { closeticketCommand } from './closeticket';
import { en_translateCommand } from './context_en_translate';
import { ja_translateCommand } from './context_ja_translate';
import { createticketCommand } from './createticket';
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
import { responseCommand } from './response';
import { responseComplete } from './response_complete';
import { roleCommand } from './role';
import { searchCommand } from './search';
import { serverCommand } from './server';
import { statusCommand } from './status';
import { timeoutCommand } from './timeout';
import { untimeoutCommand } from './untimeout';
import { userCommand } from './user';

export const interactions = {
	help: helpCommand,
	about: aboutCommand,
	avatar: avatarCommand,
	ban: banCommand,
	banlist: banlistCommand,
	banner: bannerCommand,
	clear: clearCommand,
	inlist: inlistCommand,
	invite: inviteCommand,
	join: joinCommand,
	kick: kickCommand,
	leave: leaveCommand,
	mcskin: mcskinCommand,
	mcstatus: mcstatusCommand,
	ping: pingCommand,
	role: roleCommand,
	response: responseCommand,
	log: logCommand,
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
	ja_translate: ja_translateCommand,
	en_translate: en_translateCommand
};
