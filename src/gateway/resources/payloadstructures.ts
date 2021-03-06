import GatewayEventTypes from './gatewayevents.ts';
import { BotPresenceUpdate } from '../options.ts';
import { GatewayOpcodes } from './codes.ts';

/**
 * The Gateway payload structure, received for events.
 */
export interface GatewayPayload {
	/** Payload opcode. */
	op: GatewayOpcodes;
	/** Payload data. */
	// deno-lint-ignore no-explicit-any
	d?: any;
	/** Sequence number, used for resuming and heartbeats. */
	s?: number;
	/** Payload event name. */
	t?: keyof typeof GatewayEventTypes & string;
}

/**
 * The Identify payload structure, used to authenticate with the gateway.
 */
export interface Identify extends GatewayPayload {
	op: GatewayOpcodes.IDENTIFY;
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
	shard?: [number, number];
	/** The presence for the bot user. */
	presence?: BotPresenceUpdate;
	/** The Gateway Intents. See @enum GatewayIntents for more. */
	intents: number;
}

/**
 * The Resume payload structure, used to resume a session.
 */
export interface Resume {
	/** The bot token. */
	token: string;
	/** The ID for the session. */
	session_id: string;
	/** Last `seq` number received. */
	seq: number;
}
