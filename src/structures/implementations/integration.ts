import { IdBase } from '../idbase.a.ts';
import IntegrationPayload from '../base/integration.ts';

export default class Integration extends IdBase implements IntegrationPayload {
  declare readonly id;
  name;
  type;
  enabled;
  syncing?;
  readonly role_id?;
  enable_emoticons?;
  expire_behavior;
  expire_grace_period?;
  user?;
  account;
  synced_at?;
  subscriber_count?;
  revoked?;
  application?;

  /**
   * Constructs a new Integration instance.
   * @param payload The Integration payload.
   */
  constructor (payload: IntegrationPayload) {
    super(payload.id);

    this.name = payload.name;
    this.type = payload.type;
    this.enabled = payload.enabled;
    this.syncing = payload.syncing;
    this.role_id = payload.role_id;
    this.enable_emoticons = payload.enable_emoticons;
    this.expire_behavior = payload.expire_behavior;
    this.expire_grace_period = payload.expire_grace_period;
    this.user = payload.user;
    this.account = payload.account;
    this.synced_at = payload.synced_at;
    this.subscriber_count = payload.subscriber_count;
    this.revoked = payload.revoked;
    this.application = payload.application;
  }
}