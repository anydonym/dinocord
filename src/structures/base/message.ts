import User from '../implementations/user.ts';
import GuildMember from '../implementations/guildmember.ts';
import Role from '../implementations/role.ts';

import Embed from '../implementations/embed.ts';
import Application from '../implementations/application.ts';

import Channel from '../implementations/channel.ts';

export default interface Message {
  id: string;
  channel_id: string;
  guild_id?: string;
  author: User;
  member?: Partial<GuildMember>;
  /** The message content. @requires Message Content Intent. */
  content: string;
  timestamp: string;
  edited_timestamp?: string;
  tts: boolean;
  mention_everyone: boolean;
  mentions: User[];
  mention_roles: Role[];
  mention_channels?: ChannelMention[];
  attachments: Attachment[];
  embeds: Embed[];
  reactions?: Reaction[];
  nonce?: string | number;
  pinned: boolean;
  webhook_id?: string;
  type: MessageType;
  activity?: MessageActivity;
  application?: Partial<Application>;
  application_id?: string;
  message_reference?: MessageReference;
  flags?: number;
  referenced_message?: MessageImplementation;
  interaction: MessageInteraction;
  thread?: Channel;
  components?: MessageComponent[];
  sticker_items?: Sticker[];
}

export enum MessageType {

}

export interface MessageActivity {
  type: number;
  party_id?: string;
}

export enum MessageActivityType {

}

export enum MessageFlags {

}