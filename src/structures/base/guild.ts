import Role from './role.ts';
import Emoji from './emoji.ts';
import Channel from './channel.ts';
import VoiceState from './voicestate.ts';
import GuildMember from './guildmember.ts';
import PresenceUpdate from './presenceupdate.ts';
import GuildScheduledEvent from './guildscheduledevent.ts';
import StageInstance from './stageinstance.ts';
import Sticker from './sticker.ts';

/**
 * The Guild payload structure.
 */
export default interface Guild {
	/** The guild ID. */
	id: string;
	/** The guild name. */
	name: string;
	/** The icon hash of the guild. */
	icon?: string | undefined;
	/** The icon hash of the guild, returned when in the template object. */
	icon_hash?: string | undefined;
	/** The splash hash. */
	splash?: string | undefined;
	/** The discovery splash for the guild. Available if the guild is discoverable. */
	discovery_splash?: string | undefined;
	/** Whether the user is the owner of the guild. */
	owner?: boolean;
	/** The ID of the owner of the guild. */
	owner_id: string;
	/** The permissions for the user in the guild. */
	permissions?: string | undefined;
	/** ID of the AFK channel, if set. */
	afk_channel_id?: string | undefined;
	/** The AFK timeout, if set. */
	afk_timeout: number;
	/** Whether the server widget is enabled. */
	widget_enabled?: boolean;
	/** The channel ID which the server widget leads to, if set. */
	widget_channel_id?: string | undefined;
	/**
	 * The verification level required for the guild.
	 * Use the @enum GuildVerificationLevel for possible values.
	 */
	verification_level: GuildVerificationLevel;
	/**
	 * The message notification level set for the guild.
	 * 0 means members will receive notifications for all messages, while 1 means that users will only receive notifcations on their mention.
	 */
	default_message_notifications: 0 | 1;
	/**
	 * The level of explicit content filter.
	 * 0 means all media content will not be filtered, while 1 and 2 mean that media content send by members without roles and all members will be scanned, accordingly.
	 */
	explicit_content_filter: 0 | 1 | 2;
	/** The roles in the guild. */
	roles: Role[];
	/** The custom guild emojis. */
	emojis: Emoji[];
	/** The guild features. */
	features: GuildFeatures[];
	/**
	 * The guild MFA requirement.
	 * 0 indicates that the guild has no MFA requirement for moderation permissions, while 1 means the otherwise.
	 */
	mfa_level: 0 | 1;
	application_id?: string | undefined;
	system_channel_id?: string | undefined;
	system_channel_flags: number;
	rules_channel_id?: string;
	joined_at?: string; // ISO8601
	large?: boolean;
	unavailable?: boolean;
	member_count?: number;
	voice_states?: Partial<VoiceState>[];
	members?: GuildMember[];
	channels?: Channel[];
	threads?: Channel[];
	presences?: Partial<PresenceUpdate>[];
	max_presences?: number;
	max_members?: number;
	vanity_url_code?: string;
	description?: string;
	banner?: string;
	premium_tier: number;
	premium_subscription_count?: number;
	preferred_locale: string;
	public_updates_channel_id?: string;
	max_video_channel_users?: number;
	approximate_member_count?: number;
	approximate_presence_count?: number;
	welcome_screen?: WelcomeScreen;
	nsfw_level?: number;
	stage_instances?: StageInstance[];
	stickers?: Sticker[];
	guild_scheduled_events?: GuildScheduledEvent[];
	premium_progress_bar_enabled: boolean;
}

export enum GuildVerificationLevel {
	/** Unrestricted. */
	NONE = 0,
	/** Must have a verified email on one's Discord account. */
	LOW = 1,
	/** Must also be registered on Discord for longer than 5 minutes. */
	MEDIUM = 2,
	/** Must also be a member of this server for longer than 10 minutes. */
	HIGH = 3,
	/** Must have a verified phone number on one's Discord account. */
	VERY_HIGH = 4,
}

/**
 * Discord Guild Features.
 */
export enum GuildFeatures {
	ANIMATED_ICON = 'ANIMATED_ICON',
	BANNER = 'BANNER',
	COMMERCE = 'COMMERCE',
	COMMUNITY = 'COMMUNITY',
	DISCOVERABLE = 'DISCOVERABLE',
	FEATURABLE = 'FEATURABLE',
	INVITE_SPLASH = 'INVITE_SPLASH',
	MEMBER_VERIFICATION_GATE_ENABLED = 'MEMBER_VERIFICATION_GATE_ENABLED',
	MORE_STICKERS = 'MORE_STICKERS',
	NEWS = 'NEWS',
	PARTNERED = 'PARTNERED',
	PREVIEW_ENABLED = 'PREVIEW_ENABLED',
	PRIVATE_THREADS = 'PRIVATE_THREADS',
	ROLE_ICONS = 'ROLE_ICONS',
	SEVEN_DAY_THREAD_ARCHIVE = 'SEVEN_DAY_THREAD_ARCHIVE',
	THREE_DAY_THREAD_ARCHIVE = 'THREE_DAY_THREAD_ARCHIVE',
	TICKETED_EVENTS_ENABLED = 'TICKETED_EVENTS_ENABLED',
	VANITY_URL = 'VANITY_URL',
	VERIFIED = 'VERIFIED',
	VIP_REGIONS = 'VIP_REGIONS',
	WELCOME_SCREEN_ENABLED = 'WELCOME_SCREEN_ENABLED',
}

export interface WelcomeScreen {
	/** The description of the guild in the welcome screen. */
	description?: string;
	/** The array of welcome channels set for this guild. */
	welcome_channels: WelcomeScreenChannel[];
}

export interface WelcomeScreenChannel {
	/** The ID of the channel this welcome screen channel represents. */
	channel_id: string;
	/** The description set for this welcome channel. */
	description: string;
	/** The emoji ID, if it is a custom emoji. */
	emoji_id?: string;
	/** The name of the emoji used for the welcome screen channel, string if custom, Unicode is global and otherwise null. */
	emoji_name?: string;
}
