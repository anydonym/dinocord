import PresenceUpdate from '../../structures/base/presenceupdate.ts';

export interface Identify {
  /** The bot token. */
  token: string;
  /** Connection properties. */
  properties: {
    /** The operating system. */
    $os: string;
    /** The browser. */
    $browser: string;
    /** The device. */
    $device: string;
  };
  /** Whether dinocord should use zlib compression. */
  compress?: boolean;
  /** The number of shards. */
  shard?: number;
  /** The presence for the bot user. */
  presence?: PresenceUpdate;
  /** The Gateway Intents. See @enum GatewayIntents for more. */
  intents: number;
}

export interface Resume {
  /** The bot token. */
  token: string;
  /** The ID for the session. */
  session_id: string;
  /** Last `seq` number received. */
  seq: number;
}