export const AuditLog = {
	GET_GUILD_AUDIT_LOG: (
		guild_id: string,
	) => ['get', `/guilds/${guild_id}/audit-logs`],
};

export const Channel = {
	GET_CHANNEL: (channel_id: string) => ['get', `/channels/${channel_id}`],
	MODIFY_CHANNEL: (channel_id: string) => ['patch', `/channels/${channel_id}`],
	DELETE_CHANNEL: (channel_id: string) => ['delete', `/channels/${channel_id}`],

	GET_CHANNEL_MESSAGES: (
		channel_id: string,
	) => ['get', `/channels/${channel_id}/messages`],
	GET_CHANNEL_MESSAGE: (
		channel_id: string,
		message_id: string,
	) => ['get', `/channels/${channel_id}/messages/${message_id}`],

	CREATE_MESSAGE: (
		channel_id: string,
	) => ['post', `/channels/${channel_id}/messages`],
	CROSSPOST_MESSAGE: (
		channel_id: string,
		message_id: string,
	) => ['post', `/channels/${channel_id}/messages/${message_id}/crosspost`],

	EDIT_CHANNEL_PERMISSIONS: (
		channel_id: string,
		overwrite_id: string,
	) => ['put', `/channels/${channel_id}/permissions/${overwrite_id}`],

	GET_CHANNEL_INVITES: (
		channel_id: string,
	) => ['get', `/channels/${channel_id}/invites`],
	CREATE_CHANNEL_INVITES: (
		channel_id: string,
	) => ['post', `/channels/${channel_id}/invites`],

	DELETE_CHANNEL_PERMISSION: (
		channel_id: string,
		overwrite_id: string,
	) => ['delete', `/channels/${channel_id}/permissions/${overwrite_id}`],
};

export const Message = {
	CREATE_REACTION: (
		channel_id: string,
		message_id: string,
		emoji: string,
	) => [
		'put',
		`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`,
	],
	DELETE_OWN_REACTION: (
		channel_id: string,
		message_id: string,
		emoji: string,
	) => [
		'delete',
		`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`,
	],
	DELETE_USER_REACTION: (
		channel_id: string,
		message_id: string,
		emoji: string,
		user_id: string,
	) => [
		'delete',
		`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/${user_id}`,
	],
	GET_REACTIONS: (
		channel_id: string,
		message_id: string,
		emoji: string,
	) => [
		'get',
		`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}`,
	],
	DELETE_ALL_REACTIONS: (
		channel_id: string,
		message_id: string,
	) => ['delete', `/channels/${channel_id}/messages/${message_id}/reactions`],
	DELETE_ALL_REACTIONS_FOR_EMOJI: (
		channel_id: string,
		message_id: string,
		emoji: string,
	) => [
		'delete',
		`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}`,
	],

	EDIT_MESSAGE: (
		channel_id: string,
		message_id: string,
	) => ['patch', `/channels/${channel_id}/messages/${message_id}`],
	DELETE_MESSAGE: (
		channel_id: string,
		message_id: string,
	) => ['delete', `/channels/${channel_id}/messages/${message_id}`],
	BULK_DELETE_MESSAGES: (
		channel_id: string,
	) => ['post', `/channels/${channel_id}/messages/bulk-delete`],
};

export const Emoji = {
	LIST_GUILD_EMOJIS: (
		guild_id: string,
	) => ['get', `/guilds/${guild_id}/emojis`],
	GET_GUILD_EMOJI: (
		guild_id: string,
		emoji_id: string,
	) => ['get', `/guilds/${guild_id}/emojis/${emoji_id}`],
	MODIFY_GUILD_EMOJI: (
		guild_id: string,
		emoji_id: string,
	) => ['patch', `/guilds/${guild_id}/emojis/${emoji_id}`],
	DELETE_GUILD_EMOJI: (
		guild_id: string,
		emoji_id: string,
	) => ['delete', `/guilds/${guild_id}/emojis/${emoji_id}`],
};

export const Guild = {
	CREATE_GUILD: () => ['post', `/guilds/`],
	GET_GUILD: (guild_id: string) => ['get', `/guilds/${guild_id}`],
	GET_GUILD_PREVIEW: (guild_id: string) => ['get', `/guilds/${guild_id}/preview`],
	MODIFY_GUILD: (guild_id: string) => ['patch', `/guilds/${guild_id}`],
	DELETE_GUILD: (guild_id: string) => ['delete', `/guilds/${guild_id}`],

	GET_GUILD_CHANNELS: (guild_id: string) => ['get', `/guilds/${guild_id}/channels`],
	CREATE_GUILD_CHANNEL: (guild_id: string) => ['post', `/guilds/${guild_id}/channels`],
	MODIFY_GUILD_CHANNEL_POSITIONS: (guild_id: string) => ['patch', `/guilds/${guild_id}/channels`],

	LIST_ACTIVE_THREADS: (guild_id: string) => ['get', `/guilds/${guild_id}/threads/active`],

	GET_GUILD_MEMBER: (
		guild_id: string,
		user_id: string,
	) => ['get', `/guilds/${guild_id}/members/${user_id}`],
	/** @requires `GUILD_MEMBERS` Priviliged Intent. */
	LIST_GUILD_MEMBERS: (guild_id: string) => ['get', `/guilds/${guild_id}/members`],
	SEARCH_GUILD_MEMBERS: (guild_id: string) => ['get', `/guilds/${guild_id}/members/search`],
	ADD_GUILD_MEMBER: (
		guild_id: string,
		user_id: string,
	) => ['put', `/guilds/${guild_id}/members/${user_id}`],
	MODIFY_GUILD_MEMBER: (
		guild_id: string,
		user_id: string,
	) => ['patch', `/guilds/${guild_id}/members/${user_id}`],
};
