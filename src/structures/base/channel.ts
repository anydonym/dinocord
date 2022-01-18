import User from '../implementations/user.ts';

/**
 * @todo Separate interfaces for different channel types
 */
export default interface Channel {
  id: string;
  type: ChannelType;
  guild_id?: string;
  position?: number;
  permission_overwrites: Overwrite[];
  name?: string;
  topic?: string;
  nsfw?: boolean;
  last_message_id?: string;
  bitrate?: number; // voice
  user_limit?: number; // voice
  rate_limit_per_user: number; // text
  recipents?: User[];
  icon?: string;
  owner_id?: string;
  application_id?: string;
  parent_id?: string;
  last_pin_timestamp?: string; // text
  rtc_region?: string; // voice
  video_quality_mode?: number; // voice
  message_count?: number; // text
  member_count?: number;
  thread_metadata?: ThreadMetadata; // voice
  member?: ThreadMember;
  default_auto_archive_duration?: number;
  permissions?: string;
}

export enum ChannelType {
  GUILD_TEXT =            0,
  DM =                    1,
  GUILD_VOICE =           2,
  GROUP_DM =              3,
  GUILD_CATEGORY =        4,
  GUILD_NEWS =            5,
  GUILD_STORE =           6,
  GUILD_NEWS_THREAD =     10,
  GUILD_PUBLIC_THREAD =   11,
  GUILD_PRIVATE_THREAD =  12,
  GUILD_STAGE_VOICE =     13
}