import GatewayClient from '../../gateway/client.ts';
import { IdBase } from '../idbase.a.ts';
import UserPayload from '../base/user.ts';
import CDNEndpoints, { DISCORD_CDN_BASEURL } from '../../gateway/cdnendpoints.ts';

export * as Base from '../base/user.ts';

export default class User extends IdBase implements UserPayload {
	/** The user's ID. */
	declare readonly id;
	readonly username;
	readonly discriminator;
	readonly avatar?;
	readonly bot?;
	readonly system?;
	readonly mfa_enabled?;
	readonly banner?;
	readonly accent_color?;
	readonly locale?;
	readonly verified?;
	readonly email?;
	readonly flags?;
	readonly premium_type?;
	readonly public_flags?;

	/**
	 * Constructs a new User instance.
	 * @param payload The User payload.
	 */
	constructor(public client: GatewayClient, payload: UserPayload) {
		super(payload.id);

		this.username = payload.username;
		this.discriminator = payload.discriminator;
		this.avatar = payload.avatar;
		this.bot = payload.bot;
		this.system = payload.system;
		this.mfa_enabled = payload.mfa_enabled;
		this.banner = payload.banner;
		this.accent_color = payload.accent_color;
		this.locale = payload.locale;
		this.verified = payload.verified;
		this.email = payload.email;
		this.flags = payload.flags;
		this.premium_type = payload.premium_type;
		this.public_flags = payload.public_flags;
	}

	getDefaultAvatarURL(format?: Parameters<typeof CDNEndpoints.DEFAULT_USER_AVATAR>[1]) {
		return DISCORD_CDN_BASEURL +
			CDNEndpoints.DEFAULT_USER_AVATAR((parseInt(this.discriminator) % 5).toString(), format);
	}

	getAvatarURL(format?: Parameters<typeof CDNEndpoints.USER_AVATAR>[2]) {
		if (this.avatar) {
			return DISCORD_CDN_BASEURL + CDNEndpoints.USER_AVATAR(this.id, this.avatar, format);
		} else return this.getDefaultAvatarURL('.png');
	}
}
