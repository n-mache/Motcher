import { PermissionsBitField, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { config } from 'dotenv';

config();

const commands = [
	new SlashCommandBuilder().setName('about').setDescription('このBotについて'),
	new SlashCommandBuilder()
		.setName('addrole')
		.setDescription('ロールを付与します')
		.addRoleOption((option) => option.setName('role').setDescription('付与するロール').setRequired(true))
		.addUserOption((option) => option.setName('member').setDescription('ロールを付与するメンバー').setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles),
	new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('ユーザーのアバターを表示します')
		.addUserOption((option) => option.setName('user').setDescription('アバターを表示するユーザー')),
	new SlashCommandBuilder()
		.setName('ban')
		.setDescription('ユーザーをBANします')
		.addUserOption((option) => option.setName('member').setDescription('BANするユーザー').setRequired(true)),
	new SlashCommandBuilder().setName('banlist').setDescription('BANされたユーザーを表示します'),
	new SlashCommandBuilder()
		.setName('banner')
		.setDescription('ユーザーのバナーを表示します')
		.addUserOption((option) => option.setName('user').setDescription('バナーを表示するユーザー')),
	new SlashCommandBuilder()
		.setName('clear')
		.setDescription('指定したメンバーのメッセージを削除します')
		.addUserOption((option) =>
			option.setName('member').setDescription('メッセージを削除するメンバー').setRequired(true)
		)
		.addIntegerOption((option) => option.setName('amount').setDescription('削除するメッセージの数').setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
	new SlashCommandBuilder()
		.setName('deletejoin')
		.setDescription('入室メッセージを削除します')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
	new SlashCommandBuilder()
		.setName('deleteleave')
		.setDescription('退室メッセージを削除します')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
	new SlashCommandBuilder().setName('help').setDescription('ヘルプを表示します'),
	new SlashCommandBuilder().setName('inlist').setDescription('管理者限定コマンド'),
	new SlashCommandBuilder()
		.setName('invite')
		.setDescription('サーバーのの招待リンクを表示します')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.CreateInstantInvite),
	new SlashCommandBuilder()
		.setName('joinmsg')
		.setDescription('入室メッセージを設定します')
		.addStringOption((option) => option.setName('detail').setDescription('入室メッセージ').setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
	new SlashCommandBuilder()
		.setName('kick')
		.setDescription('ユーザーをキックします')
		.addUserOption((option) => option.setName('member').setDescription('キックするユーザー').setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers),
	new SlashCommandBuilder()
		.setName('leavemsg')
		.setDescription('退室メッセージを設定します')
		.addStringOption((option) => option.setName('detail').setDescription('退室メッセージ').setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
	new SlashCommandBuilder()
		.setName('mcskin')
		.setDescription('Minecraftのスキンを表示します')
		.addStringOption((option) => option.setName('user').setDescription('スキンを表示するユーザー').setRequired(true)),
	new SlashCommandBuilder()
		.setName('mcstatus')
		.setDescription('Minecraftサーバーのステータスを表示します')
		.addStringOption((option) => option.setName('address').setDescription('サーバーアドレス').setRequired(true))
		.addIntegerOption((option) => option.setName('port').setDescription('ポート番号').setRequired(false)),
	new SlashCommandBuilder()
		.setName('memberlog')
		.setDescription('メンバーログを設定します')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),
	new SlashCommandBuilder()
		.setName('memberlogstop')
		.setDescription('メンバーログを停止します')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),
	new SlashCommandBuilder()
		.setName('msglog')
		.setDescription('メッセージログを設定します')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),
	new SlashCommandBuilder()
		.setName('msglogstop')
		.setDescription('メッセージログを停止します')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),
	new SlashCommandBuilder().setName('ping').setDescription('BotのPingを表示します'),
	new SlashCommandBuilder()
		.setName('remrole')
		.setDescription('ロールを剥奪します')
		.addRoleOption((option) => option.setName('role').setDescription('剥奪するロール').setRequired(true))
		.addUserOption((option) => option.setName('member').setDescription('ロールを剥奪するメンバー').setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles),
	new SlashCommandBuilder()
		.setName('resdelete')
		.setDescription('レスポンスを削除します')
		.addStringOption((option) => option.setName('keyword').setDescription('削除するレスポンス').setRequired(true).setAutocomplete(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
	new SlashCommandBuilder().setName('resnow').setDescription('レスポンスを表示します'),
	new SlashCommandBuilder()
		.setName('response')
		.setDescription('レスポンスを設定します')
		.addStringOption((option) => option.setName('keyword').setDescription('レスポンスのキーワード').setRequired(true))
		.addStringOption((option) => option.setName('response').setDescription('レスポンス').setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
	new SlashCommandBuilder()
		.setName('search')
		.setDescription('Googleで検索します')
		.addStringOption((option) => option.setName('query').setDescription('検索する内容').setRequired(true)),
	new SlashCommandBuilder().setName('server').setDescription('サーバーの情報を表示します'),
	new SlashCommandBuilder().setName('status').setDescription('Botのステータスを表示します'),
	new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('タイムアウトします')
		.addUserOption((option) => option.setName('member').setDescription('タイムアウトするメンバー').setRequired(true))
		.addIntegerOption((option) => option.setName('time').setDescription('タイムアウトする時間(分)').setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers),
	new SlashCommandBuilder()
		.setName('untimeout')
		.setDescription('タイムアウトを解除します')
		.addUserOption((option) =>
			option.setName('member').setDescription('タイムアウトを解除するメンバー').setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers),
	new SlashCommandBuilder()
		.setName('user')
		.setDescription('ユーザーの情報を表示します')
		.addUserOption((option) => option.setName('user').setDescription('ユーザー'))
];

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

(async () => {
	try {
		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), { body: commands });

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();
