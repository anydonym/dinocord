/**
 * The Role payload structure.
 */
export default interface Role {
  /** The role ID. */
  id: string;
  /** The role name. */
  name: string;
  /** The role color. Represented in hexadecimal color code. */
  color: number;
  /** Whether this role is displayed separately from other roles. */
  hoist?: boolean;
  /** The role icon hash. */
  icon?: string | undefined;
  /** The role Unicode emoji. */
  unicode_emoji?: string | undefined;
  /** The role position in the hierarchy. */
  position: number;
  /** The role permission bit set. */
  permissions: string;
  /** Whether this role is managed by integration. */
  managed: boolean;
  /** Whether this role can be mentioned. */
  mentionable: boolean;
  /** The role associated tags. */
  tags?: RoleTags;
}

export interface RoleTags {
  /** The ID of the bot which the role belongs to. */
  bot_id?: string;
  /** The ID of the integration which the role belongs to. */
  integration_id?: string;
  /** Whether the role is guild premium booster role. */
  premium_subscriber?: null;
}
