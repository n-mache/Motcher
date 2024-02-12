import { ContextMenuCommandBuilder, PermissionsBitField, REST, Routes, SlashCommandBuilder, ApplicationCommandType } from 'discord.js';
import { config } from 'dotenv';

config();

const commands = [
	new SlashCommandBuilder().setName('about').setDescription('このBotについて'),
	new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('ユーザーのアバターを表示します')
		.addUserOption((option) => option.setName('user').setDescription('アバターを表示するユーザー')),
	new SlashCommandBuilder()
		.setName('ban')
		.setDescription('ユーザーをBANします')
		.addUserOption((option) => option.setName('member').setDescription('BANするユーザー').setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers),
	new SlashCommandBuilder().setName('banlist').setDescription('BANされたユーザーを表示します'),
	new SlashCommandBuilder()
		.setName('banner')
		.setDescription('ユーザーのバナーを表示します')
		.addUserOption((option) => option.setName('user').setDescription('バナーを表示するユーザー')),
	new SlashCommandBuilder()
		.setName('clear')
		.setDescription('指定したメンバーのメッセージを削除します')
		.addUserOption((option) => option.setName('member').setDescription('メッセージを削除するメンバー').setRequired(true))
		.addIntegerOption((option) => option.setName('amount').setDescription('削除するメッセージの数').setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
	new SlashCommandBuilder()
		.setName('join')
		.setDescription('入室メッセージの設定')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('message')
				.setDescription('入室メッセージを設定します')
				.addStringOption((option) => option.setName('message').setDescription('設定するメッセージ').setRequired(true))
		)
		.addSubcommand((subcommand) => subcommand.setName('remove').setDescription('入室メッセージを削除します'))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
	new SlashCommandBuilder()
		.setName('leave')
		.setDescription('退室メッセージの設定')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('message')
				.setDescription('退室メッセージを設定します')
				.addStringOption((option) => option.setName('message').setDescription('設定するメッセージ').setRequired(true))
		)
		.addSubcommand((subcommand) => subcommand.setName('remove').setDescription('退室メッセージを削除します'))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
	new SlashCommandBuilder()
		.setName('log')
		.setDescription('ログの設定を行います')
		.addSubcommand((subcommand) => subcommand.setName('member').setDescription('メンバーログの設定を行います'))
		.addSubcommand((subcommand) => subcommand.setName('message').setDescription('メッセージログの設定を行います'))
		.addSubcommand((subcommand) => subcommand.setName('role').setDescription('ロールログの設定を行います'))
		.addSubcommand((subcommand) =>
			subcommand
				.setName('stop')
				.setDescription('ログの設定を削除します')
				.addStringOption((option) =>
					option
						.setName('type')
						.setDescription('削除するログの種類')
						.addChoices({ name: 'member', value: 'member' }, { name: 'message', value: 'message' }, { name: 'role', value: 'role' })
						.setRequired(true)
				)
		)
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),
	new SlashCommandBuilder().setName('help').setDescription('ヘルプを表示します'),
	new SlashCommandBuilder().setName('inlist').setDescription('管理者限定コマンド'),
	new SlashCommandBuilder()
		.setName('invite')
		.setDescription('サーバーのの招待リンクを表示します')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.CreateInstantInvite),
	new SlashCommandBuilder()
		.setName('kick')
		.setDescription('ユーザーをキックします')
		.addUserOption((option) => option.setName('member').setDescription('キックするユーザー').setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers),
	new SlashCommandBuilder()
		.setName('mcskin')
		.setDescription('Minecraftのスキンを表示します')
		.addStringOption((option) => option.setName('user').setDescription('スキンを表示するユーザー').setRequired(true)),
	new SlashCommandBuilder()
		.setName('mcstatus')
		.setDescription('Minecraftサーバーのステータスを表示します')
		.addStringOption((option) => option.setName('address').setDescription('サーバーアドレス').setRequired(true))
		.addIntegerOption((option) => option.setName('port').setDescription('ポート番号').setRequired(false)),
	new SlashCommandBuilder().setName('ping').setDescription('BotのPingを表示します'),
	new SlashCommandBuilder().setName('resnow').setDescription('レスポンスを表示します'),
	new SlashCommandBuilder()
		.setName('response')
		.setDescription('レスポンスを設定します')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('add')
				.setDescription('レスポンスを追加します')
				.addStringOption((option) => option.setName('keyword').setDescription('レスポンスのキーワード').setRequired(true))
				.addStringOption((option) => option.setName('response').setDescription('レスポンス').setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('remove')
				.setDescription('レスポンスを削除します')
				.addStringOption((option) => option.setName('keyword').setDescription('レスポンスのキーワード').setRequired(true))
		)
		.addSubcommand((subcommand) => subcommand.setName('list').setDescription('レスポンスの一覧を表示します'))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
	new SlashCommandBuilder()
		.setName('role')
		.setDescription('ロールの設定を行います')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('add')
				.setDescription('ロールを追加します')
				.addRoleOption((option) => option.setName('role').setDescription('追加するロール').setRequired(true))
				.addUserOption((option) => option.setName('member').setDescription('ロールを追加するメンバー').setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('remove')
				.setDescription('ロールを削除します')
				.addRoleOption((option) => option.setName('role').setDescription('削除するロール').setRequired(true))
				.addUserOption((option) => option.setName('member').setDescription('ロールを削除するメンバー').setRequired(true))
		)
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles),
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
		.addUserOption((option) => option.setName('member').setDescription('タイムアウトを解除するメンバー').setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers),
	new SlashCommandBuilder()
		.setName('user')
		.setDescription('ユーザーの情報を表示します')
		.addUserOption((option) => option.setName('user').setDescription('ユーザー')),
	new ContextMenuCommandBuilder().setName('日本語に翻訳').setType(ApplicationCommandType.Message),
	new ContextMenuCommandBuilder().setName('英語に翻訳').setType(ApplicationCommandType.Message)
];

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

(async () => {
	try {
		await rest.put(Routes.applicationCommands(atob(process.env.DISCORD_TOKEN.split(".")[0])!), { body: commands });

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();
