import User from '../implementations/user.ts';
import Role from '../implementations/role.ts';

/**
 * The Emoji payload structure.
 */
export default interface Emoji {
  /** The emoji ID. Nullable. */
  id?: bigint | undefined;
  /** The emoji name. */
  name?: string | undefined;
  /** The roles that are allowed to use the emoji. */
  roles?: Role[];
  /** The user that has created this emoji. */
  user?: User;
  /** Whether the emoji mandates colon wrapping. */
  require_colons?: boolean;
  /** Whether the emoji is managed. */
  managed?: boolean;
  /** Whether the emoji is animated. */
  animated?: boolean;
  /** Whether the emoji can be used. False if the guild loses Server Boosts. */
  available?: boolean;
}