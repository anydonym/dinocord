import * as Activity from '../structures/base/activity.ts';
import * as PresenceUpdate from '../structures/base/presenceupdate.ts';

/**
 * The Gateway options, used to connect and facilitate events between the gateway client and Discord gateway.
 */
export default interface GatewayClientOptions {
	/** The bot token. */
	token: string;
	/** The intents to use. */
	intents: Array<GatewayIntents | keyof typeof GatewayIntents> | number;
	/** The presence to use. */
	presence?: BotPresenceUpdate;
	/** The path to temporary file. Not necessary, but advisable. */
	temporary_file?: {
		/**
		 * Whether to store temporary useful file.
		 * @requires `--allow-read` and `--allow-write` permissions, if enabled.
		 */
		use?: boolean;
		/** The path to store temporary file. */
		path?: string;
	};
}

/**
 * The bot presence update, used to set the bot presence via the gateway.
 */
export interface BotPresenceUpdate {
	'activities': {
		'name': string;
		'type': Activity.ActivityType | keyof typeof Activity.ActivityType;
	}[];
	'client_status'?: {
		'desktop'?:
			| PresenceUpdate.Status
			| PresenceUpdate.Status[keyof PresenceUpdate.Status];
		'web'?:
			| PresenceUpdate.Status
			| PresenceUpdate.Status[keyof PresenceUpdate.Status];
		'mobile'?:
			| PresenceUpdate.Status
			| PresenceUpdate.Status[keyof PresenceUpdate.Status];
	};
	'status'?:
		| PresenceUpdate.Status
		| PresenceUpdate.Status[keyof PresenceUpdate.Status];
}

/**
 * Discord Gateway Intents. Required for starting Discord bots.
 */
export enum GatewayIntents {
	GUILDS = 1 << 0,
	/** Permissioned Intent - Must be enabled in the Discord Developers Portal. */
	GUILD_MEMBERS = 1 << 1,
	GUILD_BANS = 1 << 2,
	GUILD_EMOJIS_AND_STICKERS = 1 << 3,
	GUILD_INTEGRATIONS = 1 << 4,
	GUILD_WEBHOOKS = 1 << 5,
	GUILD_INVITES = 1 << 6,
	GUILD_VOICE_STATES = 1 << 7,
	/** Permissioned Intent - Must be enabled in the Discord Developers Portal. */
	GUILD_PRESENCES = 1 << 8,
	/** Permissioned Intent - Must be enabled in the Discord Developers Portal. */
	GUILD_MESSAGES = 1 << 9,
	GUILD_MESSAGE_REACTIONS = 1 << 10,
	GUILD_MESSAGE_TYPING = 1 << 11,
	/** Permissioned Intent - Must be enabled in the Discord Developers Portal. */
	DIRECT_MESSAGES = 1 << 12,
	DIRECT_MESSAGE_REACTIONS = 1 << 13,
	DIRECT_MESSAGE_TYPING = 1 << 14,
	GUILD_SCHEDULED_EVENTS = 1 << 16,
}
