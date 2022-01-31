import { IdBase } from '../idbase.a.ts';
import GuildPayload from '../base/guild.ts';

export default class Guild extends IdBase implements GuildPayload {
	declare readonly id;
	name;
	icon?;
	icon_hash?;
	splash?;
	discovery_splash?;
	owner?;
	readonly owner_id;
	permissions?;
	afk_channel_id?;
	afk_timeout;
	widget_enabled?;
	widget_channel_id?;
	verification_level;
	default_message_notifications;
	explicit_content_filter;
	roles;
	emojis;
	features;
	mfa_level;
	application_id?;
	system_channel_id?;
	system_channel_flags;
	rules_channel_id?;
	joined_at?;
	large?;
	unavailable?;
	member_count?;
	voice_states?;
	members?;
	channels?;
	threads?;
	presences?;
	max_presences?;
	max_members?;
	vanity_url_code?;
	description?;
	banner?;
	premium_tier;
	premium_subscription_count?;
	preferred_locale;
	public_updates_channel_id?;
	max_video_channel_users?;
	approximate_member_count?;
	approximate_presence_count?;
	welcome_screen?;
	nsfw_level?;
	stage_instances?;
	stickers?;
	guild_scheduled_events?;
	premium_progress_bar_enabled;

	/**
	 * Constructs a new Guild instance.
	 * @param payload The Guild payload.
	 */
	constructor(payload: GuildPayload) {
		super(payload.id);

		this.name = payload.name;
		this.icon = payload.icon;
		this.icon_hash = payload.icon_hash;
		this.splash = payload.splash;
		this.discovery_splash = payload.discovery_splash;
		this.owner = payload.owner;
		this.owner_id = payload.owner_id;
		this.permissions = payload.permissions;
		this.afk_channel_id = payload.afk_channel_id;
		this.afk_timeout = payload.afk_timeout;
		this.widget_enabled = payload.widget_enabled;
		this.widget_channel_id = payload.widget_channel_id;
		this.verification_level = payload.verification_level;
		this.default_message_notifications = payload.default_message_notifications;
		this.explicit_content_filter = payload.explicit_content_filter;
		this.roles = payload.roles;
		this.emojis = payload.emojis;
		this.features = payload.features;
		this.mfa_level = payload.mfa_level;
		this.application_id = payload.application_id;
		this.system_channel_id = payload.system_channel_id;
		this.system_channel_flags = payload.system_channel_flags;
		this.rules_channel_id = payload.rules_channel_id;
		this.joined_at = payload.joined_at;
		this.large = payload.large;
		this.unavailable = payload.unavailable;
		this.member_count = payload.member_count;
		this.voice_states = payload.voice_states;
		this.members = payload.members;
		this.channels = payload.channels;
		this.threads = payload.threads;
		this.presences = payload.presences;
		this.max_presences = payload.max_presences;
		this.max_members = payload.max_members;
		this.vanity_url_code = payload.vanity_url_code;
		this.description = payload.description;
		this.banner = payload.banner;
		this.premium_tier = payload.premium_tier;
		this.premium_subscription_count = payload.premium_subscription_count;
		this.preferred_locale = payload.preferred_locale;
		this.public_updates_channel_id = payload.public_updates_channel_id;
		this.max_video_channel_users = payload.max_video_channel_users;
		this.approximate_member_count = payload.approximate_member_count;
		this.approximate_presence_count = payload.approximate_presence_count;
		this.welcome_screen = payload.welcome_screen;
		this.nsfw_level = payload.nsfw_level;
		this.stage_instances = payload.stage_instances;
		this.stickers = payload.stickers;
		this.guild_scheduled_events = payload.guild_scheduled_events;
		this.premium_progress_bar_enabled = payload.premium_progress_bar_enabled;
	}
}
