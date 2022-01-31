// import Channel from '../../structures/implementations/channel.ts';
import MessagePayload from "../../structures/base/message.ts";

export default interface GatewayEventTypes {
  HELLO: void;
  READY: void;
  CHANNEL_CREATE: void;
  CHANNEL_UPDATE: void;
  CHANNEL_DELETE: undefined;
  RESUMED: void;
  RECONNECT: void;
  INVALID_SESSION: undefined;
  CHANNEL_PINS_UPDATE: undefined;
  THREAD_CREATE: undefined;
  THREAD_UPDATE: undefined;
  THREAD_DELETE: undefined;
  THREAD_LIST_SYNC: undefined;
  THREAD_MEMBER_UPDATE: undefined;
  THREAD_MEMBERS_UPDATE: undefined;
  GUILD_CREATE: undefined;
  GUILD_UPDATE: undefined;
  GUILD_DELETE: undefined;
  GUILD_BAN_ADD: undefined;
  GUILD_BAN_REMOVE: undefined;
  GUILD_EMOJIS_UPDATE: undefined;
  GUILD_STICKERS_UPDATE: undefined;
  GUILD_INTEGRATIONS_UPDATE: undefined;
  GUILD_MEMBER_ADD: undefined;
  GUILD_MEMBER_REMOVE: undefined;
  GUILD_MEMBER_UPDATE: undefined;
  GUILD_MEMBERS_CHUNK: undefined;
  GUILD_ROLE_CREATE: undefined;
  GUILD_ROLE_UPDATE: undefined;
  GUILD_ROLE_DELETE: undefined;
  GUILD_SCHEDULED_EVENT_CREATE: undefined;
  GUILD_SCHEDULED_EVENT_UPDATE: undefined;
  GUILD_SCHEDULED_EVENT_DELETE: undefined;
  GUILD_SCHEDULED_EVENT_USER_ADD: undefined;
  GUILD_SCHEDULED_EVENT_USER_REMOVE: undefined;
  INTEGRATION_CREATE: undefined;
  INTEGRATION_UPDATE: undefined;
  INTEGRATION_DELETE: undefined;
  INTERACTION_CREATE: undefined;
  INVITE_CREATE: undefined;
  INVITE_DELETE: undefined;
  MESSAGE_CREATE: MessagePayload;
  MESSAGE_DELETE: MessagePayload;
  MESSAGE_DELETE_BULK: undefined;
  MESSAGE_REACTION_ADD: undefined;
  MESSAGE_REACTION_REMOVE: undefined;
  MESSAGE_REACTION_REMOVE_ALL: undefined;
  MESSAGE_REACTION_REMOVE_EMOJI: undefined;
  PRESENCE_UPDATE: undefined;
  STAGE_INSTANCE_CREATE: undefined;
  STAGE_INSTANCE_DELETE: undefined;
  STAGE_INSTANCE_UPDATE: undefined;
  TYPING_START: undefined;
  USER_UPDATE: undefined;
  VOICE_STATE_UPDATE: undefined;
  VOICE_SERVER_UPDATE: undefined;
  WEBHOOKS_UPDATE: undefined;
}
