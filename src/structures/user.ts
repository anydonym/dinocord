export interface User {
  id:             string;
  username:       string;
  discriminator:  string;
  avatar?:        string;
  bot?:           boolean;
  system?:        boolean;
  mfa_enabled?:   boolean;
  banner?:        string;
  accent_color?:  number;
  locale?:        string;
  verified?:      boolean;
  email?:         string;
  /** The flags on the user's account. */
  flags?:         number;
  /** The type of Nitro subscription the user has on their account. */
  premium_type?:  0 | 1 | 2;
  /** The public flags of the user's account. */
  public_flags?:  number;
}