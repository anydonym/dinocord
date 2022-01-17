import Emoji from '../implementations/emoji.ts';

export default interface Activity {
  name:             string;
  type:             ActivityType;
  url?:             string;
  created_at:       number;
  timestamps?:      Timestamps[];
  application_id?:  string;
  details?:         string;
  state?:           string;
  emoji?:           Emoji;
  party?:           Party;
  assets?:          Asset[];
  secrets?:         Secret[];
  instance?:        boolean;
  flags?:           number;
  buttons?:         Button[];
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

export interface Timestamps {
  start?: number;
  end?: number;
}