import User from '../implementations/user.ts';

/**
 * @todo Separate interfaces for different channel types
 */
export default interface Channel {
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