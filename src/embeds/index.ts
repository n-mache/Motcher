import { Builder } from '../Utils/Builder';

export const embeds = {
	embed: Builder,
	help: new Builder()
		.setColor('#0099ff')
		.setTitle('使用可能コマンド')
		.setURL('https://chproducts.tech/')
		.setAuthor({
			name: 'サポートサーバー',
			iconURL: 'https://i.imgur.com/fEtyr1I.png',
			url: 'https://discord.gg/2QnCs2yqWu'
		})
		.setDescription('Created By CatHouse Products')
		.addFields(
			{ name: 'Bot', value: '`help`, `about`, `ping`, `status`' },
			{ name: 'Commands', value: '`server`, `user`, `list`, `invite`, `search`' },
			{
				name: 'Server',
				value: '`join`, `leave`, `response`, `log`'
			},
			{ name: 'Minecraft', value: '`mcskin`, `mcstatus`' },
			{ name: 'Moderation', value: '`ban`, `unban`, `kick`, `role`, `clear`, `timeout`, `untimeout`' }
		)
		.setTimestamp()
		.setFooter({ text: 'Motcher v2.0', iconURL: 'https://i.imgur.com/fEtyr1I.png' })
		.build(),
	about: new Builder()
		.setTitle('Motcher')
		.setColor('#0099ff')
		.setDescription('適当に自己満で作ってたら\nそれなりの機能ができてた便利(?)bot')
		.addFields(
			{ name: '<:bot:1078601624177627176>botについて', value: '```\nName: Motcher\n作者: moticat\nVersion: 2.0\n```' },
			{ name: '<:command:1078633336869748796>基本コマンド', value: '```\nmc!help\nまたは\n/help\n```' },
			{ name: '\n', value: '\n' },
			{ name: ':gear:詳細情報', value: '```\ndiscord.js V14.13.0\nNode V18.15.0\n100以上のサーバーに参加中\n```' },
			{
				name: ':computer:動作環境',
				value: '```\nOS: Ubuntu 22.04 LTS\nCPU: Intel(R) Xeon(R) Silver 4210 CPU @ 2.20GHz\nRAM: 2GB```'
			},
			{
				name: ':arrow_up:botの歴史',
				value:
					'```diff\n+ 2023/05/21 認証\n+ 2023/02/21 v1.0 Release\n- 2023/02/10 暴走\n+ 2022/05/15 Botアカウントの作成\n```'
			},
			{
				name: ':link:関連リンク',
				value:
					'[公式サイト](https://chproducts.github.io/docs/Motcher.html)\n[Support](https://discord.gg/2QnCs2yqWu)\n[Invite](https://discord.com/api/oauth2/authorize?client_id=975234367246975027&permissions=1540353817799&scope=applications.commands%20bot)'
			}
		)
		.setThumbnail('https://i.imgur.com/FROcN1k.png')
		.build(),
	roleAddError: new Builder()
		.addFields({
			name: 'エラー',
			value:
				'指定されたロールを付与できませんでした。\n(Bot自身についているものより順位の高いロール、同順位のロールを付与できないDiscordの仕様です。)'
		})
		.setColor('#ff0000')
		.build(),
	roleAddPermissionError: new Builder()
		.addFields({
			name: '権限不足',
			value: 'Botにロールを管理する権限(`ManageRoles`)がありません。\n管理者に問い合わせてください。'
		})
		.setColor('#ff0000')
		.build(),
	roleAddHelp: new Builder()
		.setTitle('addroleコマンド')
		.setDescription('指定したユーザーに特定のロールを付与するコマンド')
		.setColor('#0099ff')
		.addFields({ name: '使い方', value: 'mc!role add @ユーザー @ロール' })
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	roleAddSuccess: new Builder()
		.addFields({ name: 'Success', value: 'ロールを付与しました。' })
		.setColor('#0099ff')
		.build(),
	banHelp: new Builder()
		.setTitle('banコマンド')
		.setDescription('指定したメンバーをbanするコマンド')
		.setColor('#0099ff')
		.addFields({ name: '使い方', value: 'mc!ban @メンバー' })
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	banPermissionError: new Builder()
		.addFields({
			name: '権限不足',
			value: 'BotにメンバーをBanする権限(`BanMembers`)がありません。\n管理者に問い合わせてください。'
		})
		.setColor('#ff0000')
		.build(),
	banSuccess: new Builder()
		.addFields({ name: 'Success', value: '指定したメンバーをbanしました。' })
		.setColor('#0099ff')
		.build(),
	banError: new Builder()
		.addFields({
			name: 'Error',
			value:
				'指定したメンバーをbanできませんでした。\n(自分より順位の高いユーザー、同順位のユーザーの操作ができないDiscordの仕様です。)'
		})
		.setColor('#ff0000')
		.build(),
	banlistError: new Builder()
		.addFields({ name: 'Error', value: 'Banされたユーザーを取得できませんでした。' })
		.setColor('#ff0000')
		.build(),
	banlistPermissionError: new Builder()
		.addFields({
			name: '権限不足',
			value: 'BotにBanされたメンバーを取得する権限(`BanMembers`)がありません。\n管理者に問い合わせてください。'
		})
		.setColor('#ff0000')
		.build(),
	bannerInfo: new Builder()
		.addFields({ name: 'Info', value: '指定したユーザーのバナーが設定されていませんでした。' })
		.setColor('#0099ff')
		.build(),
	clearHelp: new Builder()
		.setTitle('clearコマンド')
		.setDescription('指定したユーザーのメッセージをまとめて削除するコマンド')
		.setColor('#0099ff')
		.addFields({ name: '使い方', value: 'mc!clear @ユーザー 削除したい数' })
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	clearPermissionError: new Builder()
		.addFields({
			name: '権限不足',
			value: 'Botにメッセージを管理する権限(`ManageMessages`)がありません。\n管理者に問い合わせてください。'
		})
		.setColor('#ff0000')
		.build(),
	clearSuccess: new Builder()
		.addFields({ name: 'Success', value: '指定したユーザーのメッセージを削除しました。' })
		.setColor('#0099ff')
		.build(),
	clearError: new Builder()
		.addFields({ name: 'Error', value: '指定したユーザーのメッセージを削除できませんでした。' })
		.setColor('#ff0000')
		.build(),
	invitePermissionError: new Builder()
		.addFields({
			name: '権限不足',
			value: 'Botに招待リンクを作成する権限(`CreateInstantInvite`)がありません。\n管理者に問い合わせてください。'
		})
		.setColor('#ff0000')
		.build(),
	inviteError: new Builder()
		.addFields({ name: 'Error', value: '招待リンクの作成に失敗しました。' })
		.setColor('#ff0000')
		.build(),
	kickHelp: new Builder()
		.setTitle('kickコマンド')
		.setDescription('特定のユーザーをキックするコマンド')
		.setColor('#0099ff')
		.addFields({ name: '使い方', value: 'mc!kick @ユーザー' })
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	kickPermissionError: new Builder()
		.addFields({
			name: '権限不足',
			value: 'Botにメンバーをkickする権限(`KickMembers`)がありません。\n管理者に問い合わせてください。'
		})
		.setColor('#ff0000')
		.build(),
	kickError: new Builder()
		.addFields({
			name: 'Error',
			value:
				'指定したユーザーをkickできませんでした。\n(自分より順位の高いユーザー、同順位のユーザーの操作ができないDiscordの仕様です。)'
		})
		.setColor('#ff0000')
		.build(),
	kickSuccess: new Builder()
		.addFields({ name: 'Success', value: '指定したユーザーをkickしました。' })
		.setColor('#0099ff')
		.build(),
	mcskinHelp: new Builder()
		.setTitle('mcskinコマンド')
		.setDescription('指定したユーザーのマイクラスキンを取得するコマンド')
		.setColor('#0099ff')
		.addFields({
			name: '使い方',
			value: 'mc!mcskin ユーザー名\n存在しないユーザーを指定するとスティーブのスキンが表示される場合があります。'
		})
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	mcstatusHelp: new Builder()
		.setTitle('mcstatusコマンド')
		.setDescription('指定したマイクラサーバーのステータスを取得するコマンド')
		.setColor('#0099ff')
		.addFields({
			name: '使い方',
			value: 'mc!mcstatus サーバーip ポート(任意)\nポートを指定しない場合「25565」となります。'
		})
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	mcstatusError: new Builder()
		.setColor('#ff0000')
		.setTitle('Error')
		.addFields(
			{ name: 'status', value: `error` },
			{ name: 'online', value: 'false' },
			{ name: 'サーバーのバージョン', value: '確認できませんでした。' },
			{ name: '最大プレイヤー数', value: '確認できませんでした。' },
			{ name: 'プレイヤー数', value: '確認できませんでした。' },
			{
				name: '以下の点を確認してください。',
				value: 'サーバーIP,ポート番号は間違っていませんか？\n**サーバーがオフラインの場合、情報を取得できません。**'
			}
		)
		.build(),
	pollHelp: new Builder()
		.setTitle('pollコマンド')
		.setDescription('投票パネルを作成するコマンド')
		.setColor('#0099ff')
		.addFields({ name: '使い方', value: 'mc!poll 題名 選択肢1 選択肢2 選択肢3 ...\n選択肢は6つまで' })
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	roleHelp: new Builder()
		.setTitle('roleコマンド')
		.setDescription('指定したユーザーにロールを付与するコマンド')
		.setColor('#0099ff')
		.addFields({ name: '使い方', value: 'mc!role `add|remove`' })
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	remroleHelp: new Builder()
		.setTitle('remroleコマンド')
		.setDescription('指定したユーザーからロールを剥奪するコマンド')
		.setColor('#0099ff')
		.addFields({ name: '使い方', value: 'mc!role remove @ロール @ユーザー' })
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	remrolePermissionError: new Builder()
		.addFields({
			name: '権限不足',
			value: 'Botにロールを管理する権限(`ManageRoles`)がありません。\n管理者に問い合わせてください。'
		})
		.setColor('#ff0000')
		.build(),
	remroleSuccess: new Builder()
		.addFields({ name: 'Success', value: 'ロールを剥奪しました。' })
		.setColor('#0099ff')
		.build(),
	remroleError: new Builder()
		.addFields({
			name: 'エラー',
			value:
				'指定されたロールを剥奪できませんでした。\n(自分についているものより順位の高いロール、同順位のロールを操作できないDiscordの仕様です。)'
		})
		.setColor('#ff0000')
		.build(),
	searchHelp: new Builder()
		.setTitle('searchコマンド')
		.setDescription('指定したワードを検索するコマンド')
		.setColor('#0099ff')
		.addFields({ name: '使い方', value: 'mc!search 検索したいワード' })
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	searchError: new Builder().addFields({ name: 'Error', value: '検索に失敗しました。' }).setColor('#ff0000').build(),
	timeoutPermissionError: new Builder()
		.addFields({
			name: '権限不足',
			value: 'Botにユーザーを管理する権限(`ModerateMembers`)がありません。\n管理者に問い合わせてください。'
		})
		.setColor('#0099ff')
		.build(),
	timeoutHelp: new Builder()
		.setTitle('timeoutコマンド')
		.setDescription('指定したユーザーをミュートするコマンド')
		.setColor('#0099ff')
		.addFields({ name: '使い方', value: 'mc!timeout @ユーザー 分数' })
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	timeoutSuccess: new Builder()
		.addFields({ name: 'Success', value: '指定したユーザーをミュートしました。' })
		.setColor('#0099ff')
		.build(),
	timeoutError: new Builder()
		.addFields({ name: 'Error', value: '指定したユーザーをミュートできませんでした。' })
		.setColor('#ff0000')
		.build(),
	translateError: new Builder().addFields({ name: 'Error', value: '翻訳に失敗しました。' }).setColor('#ff0000').build(),
	translateLimit: new Builder()
		.addFields({ name: 'Error', value: '一日に翻訳可能な文字数をオーバーしました。\n日付が変わってからお試しください。' })
		.setColor('#ff0000')
		.build(),
	untimeoutHelp: new Builder()
		.setTitle('untimeoutコマンド')
		.setDescription('指定したユーザーのミュートを解除するコマンド')
		.setColor('#0099ff')
		.addFields({ name: '使い方', value: 'mc!untimeout @ユーザー' })
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	untimeoutSuccess: new Builder()
		.addFields({ name: 'Success', value: '指定したユーザーのミュートを解除しました。' })
		.setColor('#0099ff')
		.build(),
	untimeoutError: new Builder()
		.addFields({ name: 'Error', value: '指定したユーザーのミュートを解除できませんでした。' })
		.setColor('#ff0000')
		.build(),
	untimeoutNo: new Builder()
		.addFields({ name: 'Error', value: '指定したユーザーはミュートされていません。' })
		.setColor('#ff0000')
		.build(),
	defaultError: new Builder().addFields({ name: 'Error', value: 'エラーが発生しました。' }).setColor('#ff0000').build(),
	saveSuccess: new Builder().addFields({ name: 'Success', value: '保存しました。' }).setColor('#0099ff').build(),
	deleteSuccess: new Builder()
		.addFields({ name: 'Success', value: '設定を削除しました。' })
		.setColor('#0099ff')
		.build(),
	joinHelp: new Builder()
		.setTitle('joinコマンド')
		.setDescription('参加時のメッセージを設定するコマンド')
		.setColor('#0099ff')
		.addFields({ name: '使い方', value: 'mc!join `message|remove`' })
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	joinmsgHelp: new Builder()
		.setTitle('joinmsgコマンド')
		.setDescription('参加時のメッセージを設定するコマンド')
		.setColor('#0099ff')
		.addFields({
			name: '使い方',
			value:
				'mc!join message 送信したいメッセージ\nコマンドを実行したチャンネルに送信されます。\n 送信メッセージに `{user}` を加えると参加ユーザーをメンションします。 '
		})
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	leaveHelp: new Builder()
		.setTitle('leaveコマンド')
		.setDescription('退出時のメッセージを設定するコマンド')
		.setColor('#0099ff')
		.addFields({ name: '使い方', value: 'mc!leave `message|remove`' })
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	leavemsgHelp: new Builder()
		.setTitle('leavemsgコマンド')
		.setDescription('退出時のメッセージを設定するコマンド')
		.setColor('#0099ff')
		.addFields({
			name: '使い方',
			value:
				'mc!leave message 送信したいメッセージ\nコマンドを実行したチャンネルに送信されます。\n 送信メッセージに `{user}` を加えると退出ユーザーをメンションします。 '
		})
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	logHelp: new Builder()
		.setTitle('logコマンド')
		.setDescription('ログを設定するコマンド')
		.setColor('#0099ff')
		.addFields({ name: '使い方', value: 'mc!log (stop) `message|member|role`' })
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	responseHelp: new Builder()
		.setTitle('responseコマンド')
		.setDescription('キーワードに対して反応する言葉を設定するコマンド')
		.setColor('#0099ff')
		.addFields({
			name: '使い方',
			value: 'mc!response `add|remove|list`'
		})
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	responseAddHelp: new Builder()
		.setTitle('Addコマンド')
		.setDescription('キーワードに対して反応する言葉を設定するコマンド')
		.setColor('#0099ff')
		.addFields({
			name: '使い方',
			value: 'mc!response add キーワード レスポンス\nキーワード、レスポンスには半角スペースを含めることができません。'
		})
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	responseRemoveHelp: new Builder()
		.setTitle('Removeコマンド')
		.setDescription('キーワードに対して反応する言葉を削除するコマンド')
		.setColor('#0099ff')
		.addFields({
			name: '使い方',
			value: 'mc!response remove キーワード'
		})
		.setFooter({ text: 'Motcher v2.0' })
		.build(),
	resnowEmpty: new Builder()
		.addFields({ name: 'Error', value: 'まだレスポンスが登録されていません。' })
		.setColor('#ff0000')
		.build(),
	PermissionError: new Builder()
		.addFields({
			name: 'Error',
			value: 'このコマンドを使用する権限がありません。'
		})
		.setColor('#ff0000')
		.build()
};
