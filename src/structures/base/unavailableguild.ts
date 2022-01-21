import Emoji from './emoji.ts';
import { GuildFeatures } from './guild.ts';

/**
 * The Unavailable Guild payload structure.
 */
export default interface UnavailableGuild {
  /** The guild ID. */
  id: bigint;
  /** The guild name. */
  name: string;
  /** The guild icon hash. */
  icon?: string;
  /** The guild splash hash. */
  splash?: string;
  /** The guild discovery splash hash. */
  discovery_splash?: string;
  /** The guild emojis. */
  emojis: Emoji[];
  /** The guild features. */
  features: GuildFeatures[];
  /** The guild approximate member count. */
  approximate_member_count: number;
  /** The guild approximate presence count. */
  approximate_presence_count: number;
  /** The guild description, if it is discoverable. */
  description?: string;
}