import IdBase from '../idbase.a.ts';
import UserPayload, { UserFlags } from '../base/user.ts';

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
   * Constructs a new User class.
   */
  constructor (userPayload: UserPayload) {
    super(userPayload.id);

    this.username = userPayload.username;
    this.discriminator = userPayload.discriminator;
    this.avatar = userPayload.avatar;
    this.bot = userPayload.bot;
    this.system = userPayload.system;
    this.mfa_enabled = userPayload.mfa_enabled;
    this.banner = userPayload.banner;
    this.accent_color = userPayload.accent_color;
    this.locale = userPayload.locale;
    this.verified = userPayload.verified;
    this.email = userPayload.email;
    this.flags = userPayload.flags;
    this.premium_type = userPayload.premium_type;
    this.public_flags = userPayload.public_flags;
  }
}