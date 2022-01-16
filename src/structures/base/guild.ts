export default interface Guild {
  /** The guild ID. */
  id:                             string;
  /** The guild name. */
  name:                           string;
  /** The icon hash of the guild. */
  icon?:                          string;
  /** The icon hash of the guild, returned when in the template object. */
  icon_hash?:                     string;
  /** The splash hash. */
  splash?:                        string;
  /** The discovery splash for the guild. Available if the guild is discoverable. */
  discovery_splash?:              string;
  owner?:                         boolean;
  owner_id:                       string;
  permissions?:                   string;
  region?:                        string;
  afk_channel_id?:                string;
  afk_timeout:                    number;
  widget_enabled?:                boolean;
  widget_channel_id?:             string;
  verification_level:             number;
  /**
   * The message notification level set for the guild.
   * 0 means members will receive notifications for all messages, while 1 means that users will only receive notifcations on their mention.
   */
  default_message_notifications:  0 | 1;
  /**
   * The level of explicit content filter.
   * 0 means all media content will not be filtered, while 1 and 2 mean that media content send by members without roles and all members will be scanned, accordingly.
   */
  explicit_content_filter:        0 | 1 | 2;
  /** The roles in the guild. */
  roles:                          Role[];
  /** The custom guild emojis. */
  emojis:                         Emoji[];
  /** The guild features. */
  features:                       GuildFeatures[];
  /**
   * The guild MFA requirement.
   * 0 indicates that the guild has no MFA requirement for moderation permissions, while 1 means the otherwise.
   */
  mfa_level:                      0 | 1;
  application_id?:                string;
  system_channel_id?:             string;
  system_channel_flags:           number;
  rules_channel_id?:              string;
  joined_at?:                     string;
  large?:                         boolean;
  unavailable?:                   boolean;
  member_count?:                  number;
  voice_states?:                  Partial<VoiceState>[];
  members?:                       GuildMember[];
  channels?:                      Channel[];
  threads?:                       Channel[];
  presences?:                     Partial<PresenceUpdate>[];
  max_presences?:                 number;
  max_members?:                   number;
  vanity_url_code?:               string;
  description?:                   string;
  banner?:                        string;
  premium_tier:                   number;
  premium_subscription_count?:    number;
  preferred_locale:               string;
  public_updates_channel_id?:     string;
  max_video_channel_users?:       number;
  approximate_member_count?:      number;
  approximate_presence_count?:    number;
  welcome_screen?:                WelcomeScreen;
  nsfw_level?:                    number;
  stage_instances?:               StageInstance[];
  stickers?:                      Sticker[];
  guild_scheduled_events?:        GuildScheduledEvent[];
  premium_progress_bar_enabled:   boolean;
}

/**
 * Discord Guild Features.
 */
export enum GuildFeatures {
  ANIMATED_ICON                     = 'ANIMATED_ICON',
  BANNER                            = 'BANNER',
  COMMERCE                          = 'COMMERCE',
  COMMUNITY                         = 'COMMUNITY',
  DISCOVERABLE                      = 'DISCOVERABLE',
  FEATURABLE                        = 'FEATURABLE',
  INVITE_SPLASH                     = 'INVITE_SPLASH',
  MEMBER_VERIFICATION_GATE_ENABLED  = 'MEMBER_VERIFICATION_GATE_ENABLED',
  MORE_STICKERS                     = 'MORE_STICKERS',
  NEWS                              = 'NEWS',
  PARTNERED                         = 'PARTNERED',
  PREVIEW_ENABLED                   = 'PREVIEW_ENABLED',
  PRIVATE_THREADS                   = 'PRIVATE_THREADS',
  ROLE_ICONS                        = 'ROLE_ICONS',
  SEVEN_DAY_THREAD_ARCHIVE          = 'SEVEN_DAY_THREAD_ARCHIVE',
  THREE_DAY_THREAD_ARCHIVE          = 'THREE_DAY_THREAD_ARCHIVE',
  TICKETED_EVENTS_ENABLED           = 'TICKETED_EVENTS_ENABLED',
  VANITY_URL                        = 'VANITY_URL',
  VERIFIED                          = 'VERIFIED',
  VIP_REGIONS                       = 'VIP_REGIONS',
  WELCOME_SCREEN_ENABLED            = 'WELCOME_SCREEN_ENABLED'
}