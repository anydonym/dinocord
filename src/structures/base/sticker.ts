import User from './user.ts';

/**
 * The Sticker payload structure.
 */
export default interface Sticker {
  /** The sticker ID. */
  id: bigint;
  /** The pack ID, if this sticker is a standard sticker. */
  pack_id?: bigint;
  /** The sticker name. */
  name: string;
  /** The sticker description. */
  description?: string;
  /** Autocomplete/suggestion tags for the sticker (max: 200 characters.) */
  tags?: string;
  /**
   * The type of the sticker.
   * 1 means that the sticker is a standard (global) Discord sticker, while 2 indicates that the sticker is from a guild.
   */
  type?: 1 | 2;
  /**
   * The format type of the sticker.
   * Type 1 is PNG, while 2 and 3 are APNG and LOTTILE, respectively.
   */
  format_type?: 1 | 2 | 3;
  /** Whether the guild sticker is available for usage. */
  available?: boolean;
  /** The ID of the guild which the sticker belongs to. */
  guild_id?: bigint;
  /** The user that uploaded the sticker. */
  user?: User;
  /** The sort order of the sticker, given it belongs to a Discord default sticker pack. */
  sort_value?: number;
}