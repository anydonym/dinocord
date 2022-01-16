import User from '../implementations/user.ts';

/**
 * The Sticker payload structure.
 */
export default interface Sticker {
  /** The sticker ID. */
  id:           string;
  /** The pack ID, if this sticker is a standard sticker. */
  pack_id?:     string;
  /** The sticker name. */
  name:         string;
  /** The sticker description. */
  description?: string;
  /** Autocomplete/suggestion tags for the sticker (max: 200 characters.) */
  tags?:        string;
  /**
   * The type of the sticker.
   * 1 means that the sticker is a standard (global) Discord sticker, while 2 indicates that the sticker is from a guild.
   */
  type?:        1 | 2;
  /**
   * The format type of the sticker.
   * Type 1 is PNG, while 2 and 3 are APNG and LOTTILE, respectively.
   */
  format_type?: 1 | 2 | 3;
  available?:   boolean;
  guild_id?:    string;
  user?:        User;
  sort_value?:  number;
}