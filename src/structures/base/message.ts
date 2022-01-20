import User from '../implementations/user.ts';
import GuildMember from '../implementations/guildmember.ts';
import Role from '../implementations/role.ts';

import Embed from '../implementations/embed.ts';
import Application from '../implementations/application.ts';

import Channel from '../implementations/channel.ts';

export default interface Message {
  /** The message ID. */
  id: bigint;
  /** The channel ID where this message was sent. */
  channel_id: bigint;
  /** The guild ID where this message was sent, if one. */
  guild_id?: bigint;
  /** The message author. */
  author: User;
  /** The message associated guild member. */
  member?: Partial<GuildMember>;
  /** The message content. @requires Message Content Intent. */
  content: string;
  /** The message creation date in ISO8601 timestamp. */
  timestamp: string;
  /** The message last edited date in ISO8601 timestamp, if edited. */
  edited_timestamp?: string;
  /** Whether the message is TTS. */
  tts: boolean;
  /** Whether the message mentions `@everyone` */
  mention_everyone: boolean;
  /** The message mentioned user(s). */
  mentions: User[];
  /** The message mentioned role(s). */
  mention_roles: Role[];
  /** The message mentioned channel(s). */
  mention_channels?: ChannelMention[];
  /** The message attachments. */
  attachments: Attachment[];
  /** The message embeds. */
  embeds: Embed[];
  /** The reactions of the message. */
  reactions?: Reaction[];
  /** Used to validate when the message was sent. */
  nonce?: string | number;
  /** Whether the message is pinned. */
  pinned: boolean;
  /** The ID of the webhook which sent this message, if any. */
  webhook_id?: bigint;
  /** The type of message. */
  type: MessageType;
  /** The message activity. */
  activity?: MessageActivity;
  application?: Partial<Application>;
  application_id?: bigint;
  message_reference?: MessageReference;
  flags?: number;
  referenced_message?: MessageImplementation;
  interaction?: MessageInteraction;
  thread?: Channel;
  components?: MessageComponent[];
  sticker_items?: Sticker[];
}

export interface ChannelMention {

}

export enum MessageType {
  DEFAULT = 0,
  RECIPENT_ADD                                  = 1,
  RECIPENT_REMOVE                               = 2,
  CALL                                          = 3,
  CHANNEL_NAME_CHANGE                           = 4,
  CHANNEL_ICON_CHANGE                           = 5,
  CHANNEL_PINNED_CHANGE                         = 6,
  GUILD_MEMBER_JOIN                             = 7,
  USER_PREMIUM_GUILD_SUBSCRIPTION               = 8,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1        = 9,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2        = 10,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3        = 11,
  CHANNEL_FOLLOW_ADD                            = 12,
  GUILD_DISCOVERY_DISQUALIFIED                  = 13,
  GUILD_DISCOVERY_REQUALIFIED                   = 14,
  GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING  = 15,
  GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING    = 16,
  THREAD_CREATED                                = 17,
  REPLY                                         = 18,
  CHAT_INPUT_COMMAND                            = 19,
  CONTEXT_MENU_COMMAND                          = 21
}

export interface MessageActivity {
  type: number;
  party_id?: bigint;
}

export enum MessageActivityType {
  JOIN          = 1,
  SPECTATE      = 2,
  LISTEN        = 3,
  JOIN_REQUEST  = 4
}

export enum MessageFlags {
  CROSSPOSTED             = 1 << 0,
  IS_CROSSPOST            = 1 << 1,
  SUPPRESS_EMBEDS         = 1 << 2,
  SOURCE_MESSAGE_DELETED  = 1 << 3,
  URGENT                  = 1 << 4,
  HAS_THREAD              = 1 << 5,
  EPHEMERAL               = 1 << 6,
  LOADING                 = 1 << 7
}