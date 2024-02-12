import { events } from './Events';
import { BaseInteraction, Client, GatewayIntentBits, GuildMember, Message, PartialGuildMember, PartialMessage, Partials, Role } from 'discord.js';
import { config } from 'dotenv';
import cron from 'node-cron';
import { userJaCounts } from './interactions/context_ja_translate';
import { userEnCounts } from './interactions/context_en_translate';

config();

cron.schedule('0 0 0 * * *', () => {
	userJaCounts.clear();
	userEnCounts.clear();
});

if (!process.env.TOKEN || !process.env.OWNER_ID || !process.env.MONGO_URL || !process.env.DEBUG_CHANNEL) {
	console.error('TOKEN、MONGO_URL、OWNER_ID、DEBUG_CHANNELのいずれかが設定されていません');
}

export const list: { [key: string]: string[] } = {};
export const bannedServers = ['1136234915663466496'];
export const bannedUsers = ['1109315933274640417'];

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.DirectMessages
	],
	allowedMentions: {
		parse: ['users'],
		repliedUser: false
	},
	partials: [Partials.Channel]
});

client
	.on('ready', () => events.onReady(client))
	.on('messageCreate', async (message: Message) => events.onMessageCreate(message))
	.on('messageUpdate', async (oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) => events.onMessageUpdate(oldMessage, newMessage))
	.on('messageDelete', async (message: Message | PartialMessage) => events.onMessageDelete(message))
	.on('guildMemberAdd', async (member: GuildMember) => events.onGuildMemberAdd(member))
	.on('guildMemberRemove', async (member: GuildMember | PartialGuildMember) => events.onGuildMemberRemove(member))
	.on('guildMemberUpdate', async (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => events.onGuildMemberUpdate(oldMember, newMember))
	.on('guildRoleCreate', async (role: Role) => events.onGuildRoleCreate(role))
	.on('guildRoleUpdate', async (oldRole: Role, newRole: Role) => events.onGuildRoleUpdate(oldRole, newRole))
	.on('guildRoleDelete', async (role: Role) => events.onGuildRoleDelete(role))
	.on('interactionCreate', async (interaction: BaseInteraction) => events.onInteractionCreate(interaction))
	.on('error', async (error: Error) => events.onError(client, error))
	.login(process.env.TOKEN);
