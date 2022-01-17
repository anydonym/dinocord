import Emoji from '../implementations/emoji.ts';

export default interface Activity {
  name: string;
  type: ActivityType;
  url?: string;
  created_at: number;
  timestamps?: ActivityTimestamp[];
  application_id?: string;
  details?: string;
  state?: string;
  emoji?: Emoji;
  party?: ActivityParty;
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
  start?: number;
  end?: number;
}

export interface ActivityParty {
  /** The ID of the party. */
  id?: string;
  /** The current and max size of the party, respectively, */
  size?: [number, number];
}

export interface ActivityAsset {
  large_imgae?: string;
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