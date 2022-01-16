import User from '../implementations/user.ts';

export default interface Channel {
  id:                             string;
  type:                           ChannelType;
  guild_id?:                      string;
  position?:                      number;
  permission_overwrites:          Overwrite[];
  name?:                          string;
  topic?:                         string;
  nsfw?:                          boolean;
  last_message_id?:               string;
  bitrate?:                       number;
  user_limit?:                    number;
  rate_limit_per_user:            number;
  recipents?:                     User[];
  icon?:                          string;
  owner_id?:                      string;
  application_id?:                string;
  parent_id?:                     string;
  last_pin_timestamp?:            string;
  rtc_region?:                    string;
  video_quality_mode?:            number;
  message_count?:                 number;
  member_count?:                  number;
  thread_metadata?:               ThreadMetadata;
  member?:                        ThreadMember;
  default_auto_archive_duration?: number;
  permissions?:                   string;
}