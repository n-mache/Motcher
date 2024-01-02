import { onError } from './onError';
import { onGuildMemberAdd } from './onGuildMemberAdd';
import { onGuildMemberRemove } from './onGuildMemberRemove';
import { onGuildMemberUpdate } from './onGuildMemberUpdate';
import { onGuildRoleCreate } from './onGuildRoleCreate';
import { onGuildRoleDelete } from './onGuildRoleDelete';
import { onGuildRoleUpdate } from './onGuildRoleUpdate';
import { onInteractionCreate } from './onInteractionCreate';
import { onMessageCreate } from './onMessageCreate';
import { onMessageDelete } from './onMessageDelete';
import { onMessageUpdate } from './onMessageUpdate';
import { onReady } from './onReady';

export const events = {
	onReady,
	onMessageCreate,
	onMessageUpdate,
	onMessageDelete,
	onInteractionCreate,
	onGuildMemberAdd,
	onGuildMemberUpdate,
	onGuildMemberRemove,
	onGuildRoleCreate,
	onGuildRoleUpdate,
	onGuildRoleDelete,
	onError
};
