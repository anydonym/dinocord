import User from '../implementations/user.ts';
import Guild from '../implementations/guild.ts';
import Channel from '../implementations/channel.ts';

export default interface Webhook {
  /** The webhook ID. */
  id: string;
  /**
   * The webhook type.
   * 1 indicates incoming webhooks can post messages to channels using a generated token, 2 indicates that the webhook is an internal webhook which is used with Channel Following to post new messages into channels and 3 refers to Application webhooks, which are used with Interactions.
   */
  type: 1 | 2 | 3;
  /** The ID of the guild this webhook belongs to. */
  guild_id?: string;
  /** The ID of the channel this webhook belongs to. */
  channel_id?: string;
  /** The user that created the webhook. */
  user?: User;
  /** The webhook default name. */
  name?: string;
  /** The webhook default avatar hash. */
  avatar?: string;
  /** The secure token of the webhook. */
  token?: string;
  /** The bot/OAuth2 application which has created this webhook. */
  application_id?: string;
  /** The guild of the channel which the webhook follows. */
  source_guild: Partial<Guild>;
  /** The channel which the webhook follows. */
  source_channel: Partial<Channel>;
  /** The URL for webhook execution. */
  url?: string;
}