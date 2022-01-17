import GuildMemberPayload from '../base/guildmember.ts';

export default class GuildMember implements GuildMemberPayload {
  readonly user?;
  nick?;
  readonly avatar?;
  roles?;
  readonly joined_at;
  readonly premium_since?;
  deaf;
  mute;
  pending;
  permissions;
  readonly communication_disabled_until;

  /**
   * Constructs a new Guild Member instance.
   * @param payload The Guild Member payload.
   */
  constructor (payload: GuildMemberPayload) {
    this.user = payload.user;
    this.nick = payload.nick;
    this.avatar = payload.avatar;
    this.roles = payload.roles;
    this.joined_at = payload.joined_at;
    this.premium_since = payload.premium_since;
    this.deaf = payload.deaf;
    this.mute = payload.mute;
    this.pending = payload.pending;
    this.permissions = payload.permissions;
    this.communication_disabled_until = payload.communication_disabled_until;
  }
}