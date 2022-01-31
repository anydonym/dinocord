import GuildMember from "./guildmember.ts";

export default interface VoiceState {
  /** The guild ID of the voice state. */
  guild_id?: string;
  /** The channel ID the user is connected to. */
  channel_id: string;
  /** The user ID of the voice state. */
  user_id: string;
  /** The Guild Member the voice state points to. */
  member?: GuildMember;
  /** The voice state session ID. */
  session_id: string;
  /** Whether the user is deafened server-side. */
  deaf: boolean;
  /** Whether the user is muted server-side. */
  mute: boolean;
  /** Whether the user has deafened themselves. */
  self_deaf: boolean;
  /** Whether the user has muted themselves. */
  self_mute: boolean;
  /** Whether the user is streaming. */
  self_stream?: boolean;
  /** Whether the user has their camera enabled. */
  self_video: boolean;
  /** Whether the user is muted by themselves. */
  suppress: boolean;
  /** The ISO8601 timestamp which the user requested to speak. */
  request_to_speak_timestamp?: string;
}
