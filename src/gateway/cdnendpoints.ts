import { DISCORD_CDN_BASEURL } from '../constants.ts';

type JPEG = '.jpg' | 'jpeg';
type PNG = '.png';
type WebP = '.webp';
type GIF = '.gif';
type Lottie = '.json';

const Endpoints = {
	CUSTOM_EMOJI: (
		emoji_id: string,
		format: PNG | JPEG | WebP | GIF = emoji_id.startsWith('a_') ? '.gif' : '.png',
	) => `/emojis/${emoji_id}${format}`,
	GUILD_ICON: (
		guild_id: string,
		guild_icon: string,
		format: PNG | JPEG | WebP | GIF = guild_icon.startsWith('a_') ? '.gif' : '.png',
	) => `/icons/${guild_id}/${guild_icon}${format}`,
	GUILD_SPLASH: (guild_id: string, guild_splash: string, format: PNG | JPEG | WebP = '.png') =>
		`/splashes/${guild_id}/${guild_splash}${format}`,
	GUILD_DISCOVERY_SPLASH: (
		guild_id: string,
		guild_discovery_splash: string,
		format: PNG | JPEG | WebP = '.png',
	) => `/discovery-splashes/${guild_id}/${guild_discovery_splash}${format}`,
	GUILD_BANNER: (guild_id: string, guild_banner: string, format: PNG | JPEG | WebP = '.png') =>
		`/banners/${guild_id}/${guild_banner}${format}`,
	USER_BANNER: (
		user_id: string,
		user_banner: string,
		format: PNG | JPEG | WebP | GIF = user_banner.startsWith('a_') ? '.gif' : '.png',
	) => `/banners/${user_id}/${user_banner}${format}`,
	DEFAULT_USER_AVATAR: (user_discriminator: string, format: PNG = '.png') =>
		`/embed/avatars/${user_discriminator}${format}`,
	USER_AVATAR: (
		user_id: string,
		user_avatar: string,
		format: PNG | JPEG | WebP | GIF = user_avatar.startsWith('a_') ? '.gif' : '.png',
	) => `/avatars/${user_id}/${user_avatar}${format}`,
	GUILD_MEBER_AVATAR: (
		guild_id: string,
		user_id: string,
		member_avatar: string,
		format: PNG | JPEG | WebP | GIF = member_avatar.startsWith('a_') ? '.gif' : '.png',
	) => `/guilds/${guild_id}/users/${user_id}/avatars/${member_avatar}${format}`,
	APPLICATION_ICON: (application_id: string, icon: string, format: PNG | JPEG | WebP = '.png') =>
		`/app-icons/${application_id}/${icon}${format}`,
	APPLICATION_COVER: (
		application_id: string,
		cover_image: string,
		format: PNG | JPEG | WebP = '.png',
	) => `/app-icons/${application_id}/${cover_image}${format}`,
	APPLICATION_ASSET: (application_id: string, asset_id: string, format: PNG | JPEG | WebP) =>
		`/app-assets/${application_id}/${asset_id}${format}`,
	ACHIEVEMENT_ICON: (
		application_id: string,
		achievement_id: string,
		icon_hash: string,
		format: PNG | JPEG | WebP,
	) => `/app-assets/${application_id}/achievements/${achievement_id}/icons/${icon_hash}${format}`,
	STICKER_PACK_BANNER: (sticker_pack_banner_asset_id: string, format: PNG | JPEG | WebP = '.png') =>
		`/app-assets/710982414301790216/store/${sticker_pack_banner_asset_id}${format}`,
	TEAM_ICON: (team_id: string, team_icon: string, format: PNG | JPEG | WebP = '.png') =>
		`/team-icons/${team_id}/${team_icon}${format}`,
	STICKER: (sticker_id: string, format: PNG | Lottie) => `/stickers/${sticker_id}${format}`,
	ROLE_ICON: (role_id: string, role_icon: string, format: PNG | JPEG | WebP = '.png') =>
		`/role-icons/${role_id}/${role_icon}${format}`,
	GUILD_SCHEDULED_EVENT_COVER: (
		scheduled_event_id: string,
		scheduled_event_cover_image: string,
		format: PNG | JPEG | WebP = '.png',
	) => `/guild-events/${scheduled_event_id}/${scheduled_event_cover_image}/${format}`,
} as const;

export default Endpoints;
export { DISCORD_CDN_BASEURL };
