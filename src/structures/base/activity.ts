import Emoji from '../implementations/emoji.ts';

/**
 * The Activity payload structure.
 */
export default interface Activity {
  /** The activity name. */
  name: string;
  /**
   * The activity type.
   * Refer to @enum ActivityType for possible activity types.
   */
  type: ActivityType;
  /** The activity stream URL, if type is 1. */
  url?: string;
  /** The Unix timestamp (in ms) for when the activity was added to the user's session. */
  created_at: number;
  /** The Unix timestamps for the beginning and/or the end of the game. */
  timestamps?: ActivityTimestamp[];
  /** The application ID for the activity. */
  application_id?: bigint;
  /** The activity details. */
  details?: string;
  /** The activity party state. */
  state?: string;
  /** The emoji, if the activity is a custom status. */
  emoji?: Emoji;
  /** The information for the current party of the user. */
  party?: ActivityParty;
  /**  */
  assets?: ActivityAsset[];
  secrets?: ActivitySecret[];
  instance?: boolean;
  flags?: ActivityFlag[];
  buttons?: ActivityButton[];
}

export enum ActivityType {
  /** Playing {content} */
  GAME        = 0,
  /** Streaming {content} */
  STREAMING   = 1,
  /** Listening to {content} */
  LISTENING   = 2,
  /** Watching {contnt} */
  WATCHING    = 3,
  /**
   * {emoji} {content}
   * @notice Cannot be used for bots. See this issue for more: https://github.com/discord/discord-api-docs/issues/1160#issuecomment-546549516
   */
  CUSTOM      = 4,
  /** Competing in {content} */
  COMPETING   = 5
}

export interface ActivityTimestamp {
  /** The beginning of the activity. */
  start?: number;
  /** The end of the activity. */
  end?: number;
}

export interface ActivityParty {
  /** The ID of the party. */
  id?: bigint;
  /** The current and max size of the party, respectively, */
  size?: [number, number];
}

export interface ActivityAsset {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

export interface ActivitySecret {
  join?: string;
  spectate?: string;
  match?: string;
}

export enum ActivityFlag {
  INSTANCE                    = 1 << 0,
  JOIN                        = 1 << 1,
  SPECTATE                    = 1 << 2,
  JOIN_REQUEST                = 1 << 3,
  SYNC                        = 1 << 4,
  PLAY                        = 1 << 5,
  PARTY_PRIVACY_FRIENDS       = 1 << 6,
  PARTY_PRIVACY_VOICE_CHANNEL = 1 << 7,
  EMBEDDED                    = 1 << 8
}

export interface ActivityButton {
  /** The button label. */
  label: string;
  /** The URL the button leads to. */
  url: string;
}