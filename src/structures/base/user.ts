/**
 * The User payload structure.
 */
export default interface UserPayload {
  /** The user's ID. */
  id:             string;
  /** The user's username. */
  username:       string;
  /** The 4-digit ending discriminator of the user. */
  discriminator:  string;
  /** The hash of the user's avatar. */
  avatar?:        string;
  /** Whether or not the user is a bot. */
  bot?:           boolean;
  /** Whether or not the user is an Official Discord System user. */
  system?:        boolean;
  /** The user's MFA status. */
  mfa_enabled?:   boolean;
  /** The user's banner hash. */
  banner?:        string;
  /** The user's banner color in the form of an hexadecimal color code. */
  accent_color?:  number;
  /** The user language chosen on Discord. */
  locale?:        string;
  /** Whether or not the user's associated email has been verified. Requires `email` OAuth2 scope. */
  verified?:      boolean;
  /** The user's email. Requires `email` OAuth2 scope. */
  email?:         string;
  /** The flags on the user's account. */
  flags?:         UserFlags;
  /**
   * The type of Nitro subscription the user has on their account.
   * 0 means the user has no active Nitro Subscription, while 1 and 2 mean the user has subscribed to Nitro Classic and Nitro, respectively.
   */
  premium_type?:  0 | 1 | 2;
  /** The public flags of the user's account. */
  public_flags?:  number;
}

/**
 * Discord User flags.
 */
export enum UserFlags {
  NONE                        = 0,
  STAFF                       = 1 << 0,
  PARTNER                     = 1 << 1,
  HYPESQUAD                   = 1 << 2,
  BUG_HUNTER_LEVEL_1          = 1 << 3,
  HYPESQUAD_ONLINE_HOUSE_1    = 1 << 6,
  HYPESQUAD_ONLINE_HOUSE_2    = 1 << 7,
  HYPESQUAD_ONLINE_HOUSE_3    = 1 << 8,
  PREMIUM_EARLY_SUPPORTER     = 1 << 9,
  TEAM_PSEUDO_USER            = 1 << 10,
  BUG_HUNTER_LEVEL_2          = 1 << 14,
  VERIFIED_BOT                = 1 << 16,
  VERIFIED_DEVELOPER          = 1 << 17,
  CERTIFIED_MODERATOR         = 1 << 18,
  BOT_HTTP_INTERACTIONS       = 1 << 19
}