import User from './user.ts';
import Guild from './guild.ts';
import Channel from './channel.ts';

export default interface Webhook {
  /** The webhook ID. */
  id: bigint;
  /**
   * The webhook type.
   * 1 indicates incoming webhooks can post messages to channels using a generated token, 2 indicates that the webhook is an internal webhook which is used with Channel Following to post new messages into channels and 3 refers to Application webhooks, which are used with Interactions.
   */
  type: 1 | 2 | 3;
  /** The ID of the guild this webhook belongs to. */
  guild_id?: bigint;
  /** The ID of the channel this webhook belongs to. */
  channel_id?: bigint;
  /** The user that created the webhook. */
  user?: User;
  /** The webhook default name. */
  name?: string;
  /** The webhook default avatar hash. */
  avatar?: string;
  /** The secure token of the webhook. */
  token?: string;
  /** The bot/OAuth2 application which has created this webhook. */
  application_id?: bigint;
  /** The guild of the channel which the webhook follows. */
  source_guild: Partial<Guild>;
  /** The channel which the webhook follows. */
  // source_channel: Partial<Channel>;
  /** The URL for webhook execution. */
  url?: string;
}