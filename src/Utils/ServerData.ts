/**
 * サーバーへの参加に関するデータを表すインターフェース
 */
export interface ServerJoinData {
	joinMessage: string;
	channelId: string;
}

/**
 * サーバーからの離脱に関するデータを表すインターフェース
 */
export interface ServerLeaveData {
	leaveMessage: string;
	channelId: string;
}

/**
 * サーバーのメンバーに関するデータを表すインターフェース
 */
export interface ServerMemberData {
	channelId: string;
}

/**
 * サーバーのメッセージに関するデータを表すインターフェース
 */
export interface ServerMsgData {
	channelId: string;
}

/**
 * サーバーのレスポンスに関するデータを表すインターフェース
 */
export interface ServerResponseData {
	[key: string]: string;
}

/**
 * サーバーのロールに関するデータを表すインターフェース
 */
export interface ServerRoleData {
	channelId: string;
}
