import { IdBase } from '../idbase.a.ts';
import WebhookPayload from '../base/webhook.ts';

export default class Webhook extends IdBase implements WebhookPayload {
  /** The webhook ID. */
  declare readonly id;
  readonly type;
  readonly guild_id?;
  readonly channel_id?;
  user?;
  name?;
  avatar?;
  token?;
  readonly application_id?;
  readonly source_guild;
  readonly source_channel;
  url?;

  constructor (payload: WebhookPayload) {
    super(payload.id);

    this.type = payload.type;
    this.guild_id = payload.guild_id;
    this.channel_id = payload.channel_id;
    this.user = payload.user;
    this.name = payload.name;
    this.avatar = payload.avatar;
    this.token = payload.token;
    this.application_id = payload.application_id;
    this.source_guild = payload.source_guild;
    this.source_channel = payload.source_channel;
    this.url = payload.url;
  }
}