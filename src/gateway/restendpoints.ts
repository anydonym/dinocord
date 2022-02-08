const Endpoints = {
	GET_GUILD_AUDIT_LOG: ['get', (
		guild_id: string,
	) => `/guilds/${guild_id}/audit-logs`],

	GET_CHANNEL: ['get', (channel_id: string) => `/channels/${channel_id}`],
	MODIFY_CHANNEL: ['patch', (channel_id: string) => `/channels/${channel_id}`],
	DELETE_CHANNEL: ['delete', (channel_id: string) => `/channels/${channel_id}`],

	GET_CHANNEL_MESSAGES: ['get', (
		channel_id: string,
	) => `/channels/${channel_id}/messages`],
	GET_CHANNEL_MESSAGE: ['get', (
		channel_id: string,
		message_id: string,
	) => `/channels/${channel_id}/messages/${message_id}`],

	CREATE_MESSAGE: ['post', (
		channel_id: string,
	) => `/channels/${channel_id}/messages`],
	CROSSPOST_MESSAGE: ['post', (
		channel_id: string,
		message_id: string,
	) => `/channels/${channel_id}/messages/${message_id}/crosspost`],

	EDIT_CHANNEL_PERMISSIONS: ['put', (
		channel_id: string,
		overwrite_id: string,
	) => `/channels/${channel_id}/permissions/${overwrite_id}`],

	GET_CHANNEL_INVITES: ['get', (
		channel_id: string,
	) => `/channels/${channel_id}/invites`],
	CREATE_CHANNEL_INVITES: ['post', (
		channel_id: string,
	) => `/channels/${channel_id}/invites`],

	DELETE_CHANNEL_PERMISSION: ['delete', (
		channel_id: string,
		overwrite_id: string,
	) => `/channels/${channel_id}/permissions/${overwrite_id}`],

	CREATE_REACTION: [
		'put',
		(
			channel_id: string,
			message_id: string,
			emoji: string,
		) => `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`,
	],
	DELETE_OWN_REACTION: [
		'delete',
		(
			channel_id: string,
			message_id: string,
			emoji: string,
		) => `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`,
	],
	DELETE_USER_REACTION: [
		'delete',
		(
			channel_id: string,
			message_id: string,
			emoji: string,
			user_id: string,
		) => `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/${user_id}`,
	],
	GET_REACTIONS: [
		'get',
		(
			channel_id: string,
			message_id: string,
			emoji: string,
		) => `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}`,
	],
	DELETE_ALL_REACTIONS: ['delete', (
		channel_id: string,
		message_id: string,
	) => `/channels/${channel_id}/messages/${message_id}/reactions`],
	DELETE_ALL_REACTIONS_FOR_EMOJI: [
		'delete',
		(
			channel_id: string,
			message_id: string,
			emoji: string,
		) => `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}`,
	],

	EDIT_MESSAGE: ['patch', (
		channel_id: string,
		message_id: string,
	) => `/channels/${channel_id}/messages/${message_id}`],
	DELETE_MESSAGE: ['delete', (
		channel_id: string,
		message_id: string,
	) => `/channels/${channel_id}/messages/${message_id}`],
	BULK_DELETE_MESSAGES: ['post', (
		channel_id: string,
	) => `/channels/${channel_id}/messages/bulk-delete`],

	LIST_GUILD_EMOJIS: ['get', (
		guild_id: string,
	) => `/guilds/${guild_id}/emojis`],
	GET_GUILD_EMOJI: ['get', (
		guild_id: string,
		emoji_id: string,
	) => `/guilds/${guild_id}/emojis/${emoji_id}`],
	MODIFY_GUILD_EMOJI: ['patch', (
		guild_id: string,
		emoji_id: string,
	) => `/guilds/${guild_id}/emojis/${emoji_id}`],
	DELETE_GUILD_EMOJI: ['delete', (
		guild_id: string,
		emoji_id: string,
	) => `/guilds/${guild_id}/emojis/${emoji_id}`],

	CREATE_GUILD: ['post', () => `/guilds/`],
	GET_GUILD: ['get', (guild_id: string) => `/guilds/${guild_id}`],
	GET_GUILD_PREVIEW: ['get', (guild_id: string) => `/guilds/${guild_id}/preview`],
	MODIFY_GUILD: ['patch', (guild_id: string) => `/guilds/${guild_id}`],
	DELETE_GUILD: ['delete', (guild_id: string) => `/guilds/${guild_id}`],

	GET_GUILD_CHANNELS: ['get', (guild_id: string) => `/guilds/${guild_id}/channels`],
	CREATE_GUILD_CHANNEL: ['post', (guild_id: string) => `/guilds/${guild_id}/channels`],
	MODIFY_GUILD_CHANNEL_POSITIONS: ['patch', (guild_id: string) => `/guilds/${guild_id}/channels`],

	LIST_ACTIVE_THREADS: ['get', (guild_id: string) => `/guilds/${guild_id}/threads/active`],

	GET_GUILD_MEMBER: ['get', (
		guild_id: string,
		user_id: string,
	) => `/guilds/${guild_id}/members/${user_id}`],
	/** @requires `GUILD_MEMBERS` Priviliged Intent. */
	LIST_GUILD_MEMBERS: ['get', (guild_id: string) => `/guilds/${guild_id}/members`],
	SEARCH_GUILD_MEMBERS: ['get', (guild_id: string) => `/guilds/${guild_id}/members/search`],
	ADD_GUILD_MEMBER: ['put', (
		guild_id: string,
		user_id: string,
	) => `/guilds/${guild_id}/members/${user_id}`],
	MODIFY_GUILD_MEMBER: ['patch', (
		guild_id: string,
		user_id: string,
	) => `/guilds/${guild_id}/members/${user_id}`],
	MODIFY_CURRENT_MEMBER: ['patch', (guild_id: string) => `/guilds/${guild_id}/members/@me`],
	ADD_GUILD_MEMBER_ROLE: [
		'put',
		(guild_id: string, user_id: string, role_id: string) =>
			`/guilds/${guild_id}/members/${user_id}/roles/${role_id}`,
	],
	REMOVE_GUILD_MEMBER_ROLE: [
		'delete',
		(guild_id: string, user_id: string, role_id: string) =>
			`/guilds/${guild_id}/members/${user_id}/roles/${role_id}`,
	],
	REMOVE_GUILD_MEMBER: [
		'delete',
		(guild_id: string, user_id: string) => `/guilds/${guild_id}/members/${user_id}`,
	],

	CREATE_WEBHOOK: ['post', (channel_id: string) => `/channels/${channel_id}/webhooks`],
	GET_CHANNEL_WEBHOOKS: ['get', (channel_id: string) => `/channels/${channel_id}/webhooks`],
	GET_GUILD_WEBHOOKS: ['get', (guild_id: string) => `/guilds/${guild_id}/webhooks`],
	GET_WEBHOOK: ['get', (webhook_id: string) => `/webhooks/${webhook_id}`],
	GET_WEBHOOK_WITH_TOKEN: [
		'get',
		(webhook_id: string, webhook_token: string) => `/webhooks/${webhook_id}/${webhook_token}`,
	],
	MODIFY_WEBHOOK: ['patch', (webhook_id: string) => `/webhooks/${webhook_id}`],
	MODIFY_WEBHOOK_WITH_TOKEN: [
		'patch',
		(webhook_id: string, webhook_token: string) => `/webhooks/${webhook_id}/${webhook_token}`,
	],
	DELETE_WEBHOOK: ['delete', (webhook_id: string) => `/webhooks/${webhook_id}`],
	DELETE_WEBHOOK_WITH_TOKEN: [
		'delete',
		(webhook_id: string, webhook_token: string) => `/webhooks/${webhook_id}/${webhook_token}`,
	],
	EXECUTE_WEBHOOK: [
		'post',
		(webhook_id: string, webhook_token: string) => `/webhooks/${webhook_id}/${webhook_token}`,
	],

	GET_CURRENT_USER: [
		'get',
		() => `/users/@me`,
	],
	GET_USER: [
		'get',
		(user_id: string) => `/users/${user_id}`,
	],
	MODIFY_CURRENT_USER: [
		'patch',
		() => `/users/@me`,
	],
	GET_CURRENT_USER_GUILDS: [
		'get',
		() => `/users/@me/guilds`,
	],
	GET_CURRENT_USER_GUILD_MEMBER: [
		'get',
		(guild_id: string) => `/users/@me/guilds/${guild_id}/member`,
	],
	LEAVE_GUILD: [
		'delete',
		(guild_id: string) => `/users/@me/guilds/${guild_id}`,
	],
	CREATE_DM: [
		'post',
		() => `/users/@me/channels`,
	],
	CREATE_GROUP_DM: [
		'post',
		() => `/users/@me/channels`,
	],
	GET_USER_CONNECTIONS: [
		'get',
		() => `/users/@me/connections`,
	],

	GET_GATEWAY: [
		'get',
		() => `/gateway`,
	],
	GET_GATEWAY_BOT: [
		'get',
		() => `/gateway/bot`,
	],
} as const;

export default Endpoints;
