import IdBase from '../idbase.a.ts';
import RolePayload, { RoleTags } from '../base/role.ts';

export default class Role extends IdBase implements RolePayload {
  declare readonly id: string;
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

  constructor (rolePayload: RolePayload) {
    super(rolePayload.id);

    this.name = rolePayload.name;
    this.color = rolePayload.color;
    this.hoist = rolePayload.hoist;
    this.icon = rolePayload.icon;
    this.unicode_emoji = rolePayload.unicode_emoji;
    this.position = rolePayload.position;
    this.permissions = rolePayload.permissions;
    this.managed = rolePayload.managed;
    this.mentionable = rolePayload.mentionable;
    this.tags = rolePayload.tags
  }
}