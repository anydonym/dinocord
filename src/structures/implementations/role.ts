import { IdBase } from '../idbase.a.ts';
import RolePayload from '../base/role.ts';
import bitwiseCheck from '../../util/bitwisecheck.ts';
import { Permission } from '../permission.ts';

export default class Role extends IdBase implements RolePayload {
  declare readonly id: bigint;
  name;
  color;
  hoist?;
  icon?;
  unicode_emoji?;
  position;
  permissions;
  managed;
  mentionable;
  readonly tags?;

  /**
   * Constructs a new Role instance.
   * @param payload The Role payload.
   */
  constructor (payload: RolePayload) {
    super(payload.id);

    this.name = payload.name;
    this.color = payload.color;
    this.hoist = payload.hoist;
    this.icon = payload.icon;
    this.unicode_emoji = payload.unicode_emoji;
    this.position = payload.position;
    this.permissions = payload.permissions;
    this.managed = payload.managed;
    this.mentionable = payload.mentionable;
    this.tags = payload.tags
  }

  get getPermissions() {
    return bitwiseCheck(parseInt(this.permissions, 10), Permission);
  }
}