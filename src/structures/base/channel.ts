import User from './user.ts';

/**
 * @todo Separate interfaces for different channel types
 */
export default interface Channel {
  id: bigint;
  type: ChannelType;
  guild_id?: bigint;
  position?: number;
  permission_overwrites: PermissionOverwrite[];
  name?: string;
  topic?: string | undefined;
  nsfw?: boolean;
  last_message_id?: bigint | undefined;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipents?: User[];
  icon?: string | undefined;
  owner_id?: bigint;
  last_pin_timestamp?: string | undefined;
  rtc_region?: string | undefined;
  video_quality_mode?: number;
  message_count?: number;
  member_count?: number;
  thread_metadata?: ThreadMetadata;
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

export interface ThreadMetadata {
  archived: boolean;
  auto_archive_duration: 60 | 1440 | 4320 | 10080;
  archive_timestamp: string;
  locked: boolean;
  invitable?: boolean;
}

export interface ThreadMember {
  id?: bigint;
  user_id?: bigint;
  join_timestamp: number;
  flags: number;
}