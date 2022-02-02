import * as Activity from '../structures/base/activity.ts';
import * as PayloadStructures from './resources/payloadstructures.ts';
import * as GatewayCodes from './resources/codes.ts';

import GatewayOptions, { BotPresenceUpdate, GatewayIntents } from './options.ts';
import GatewayEventTypes from './resources/gatewayevents.ts';
import InternalEventTypes from './resources/internalevents.ts';
import {
	DINOCORD_GITHUB_URL,
	DINOCORD_VERSION,
	DISCORD_REST_BASEURL,
	DISCORD_WS_BASEURL,
} from '../constants.ts';

import bitwiseCheck from '../util/bitwisecheck.ts';
import json from '../util/json.ts';
import trace from '../util/trace.ts';

import { axiod } from '../d.ts';
import User from '../structures/implementations/user.ts';

/**
 * The client class, the interface between the application and the gateway.
 */
export default class GatewayClient {
	/** The websocket. */
	ws!: WebSocket;
	/** The options used for connecting to the gateway. */
	readonly options: GatewayOptions;
	/** The listeners for gateway events. */
	// deno-lint-ignore no-explicit-any
	gateway_listeners: [keyof typeof GatewayEventTypes, (payload: any) => void][];
	/** The listeners for internal events. */
	// deno-lint-ignore no-explicit-any
	internal_listeners: [keyof InternalEventTypes, (payload: any) => void][];

	/** REST API default config. */
	readonly config;
	user?: Readonly<User>;

	/**
	 * Build a new Gateway Client.
	 * @param options The options to use for the gateway.
	 */
	constructor(options: GatewayOptions) {
		this.options = options;
		this.gateway_listeners = [];
		this.internal_listeners = [];

		this.config = {
			'headers': {
				'Authorization': `Bot ${this.options.token}`,
				'User-Agent': `DiscordBot (${DINOCORD_GITHUB_URL}, ${DINOCORD_VERSION})`,
			},
			'baseURL': DISCORD_REST_BASEURL,
		};
	}

	/**
	 * Facilitate a connection to the Discord gateway.
	 */
	async connect() {
		if (typeof this.options.intents != 'number') {
			this.options.intents = <number> this.options.intents.filter((v, i, a) => a.indexOf(v) == i)
				.reduce(
					(pv, nv) =>
						(typeof pv == 'string' ? GatewayIntents[pv as keyof typeof GatewayIntents] : pv) +
						(typeof nv == 'string' ? GatewayIntents[nv as keyof typeof GatewayIntents] : nv),
					0,
				);
		}

		if (!bitwiseCheck(this.options.intents, GatewayIntents)) {
			throw new Error(
				`Invalid Intents: Intents must be a bitfield value. Got '${this.options.intents}'.`,
			);
		}

		if (this.options.presence) {
			if (this.options.presence.activities) {
				this.options.presence = this.parsePresence(this.options.presence);
			}
		}

		this.ws = new WebSocket(DISCORD_WS_BASEURL);
		this.ws.addEventListener('message', (event) => this.#receive(event));
		this.ws.addEventListener('close', (event) => this.#closed(event.code));
	}

	/**
	 * Closes the connection from the client to the gateway.
	 * @param close_code The close code to use.
	 */
	async disconnect(close_code = 1000) {
		this.ws.close(close_code);
	}

	/**
	 * Listen to the event broadcasted by the gateway.
	 * @param event_name The event name.
	 * @param callback The callback function.
	 * @returns This instance of client.
	 */
	listenGateway<E extends keyof typeof GatewayEventTypes>(
		event_name: E,
		callback: (
			payload: typeof GatewayEventTypes[E][1] extends Record<never, never>
				? InstanceType<typeof GatewayEventTypes[E][1]['default']>
				: undefined,
		) => void,
	) {
		this.gateway_listeners.push([event_name, callback]);
		return this;
	}

	/**
	 * Listen to the internal client event, such as debug, error, etc.
	 * @param event_name The event name.
	 * @param callback The callback function.
	 * @returns This instance of client.
	 */
	listenInternal<E extends keyof InternalEventTypes>(
		event_name: E,
		callback: (payload: InternalEventTypes[E]) => void,
	) {
		this.internal_listeners.push([event_name, callback]);
		return this;
	}

	/**
	 * Emits the event and calls all the listeners of the event emitted from the Discord gateway.
	 * @param event_name The event name.
	 * @param payload The event payload.
	 * @returns Whether there is at least one listener of the event.
	 */
	async emitGateway<E extends keyof typeof GatewayEventTypes>(
		event_name: E,
		payload: typeof GatewayEventTypes[E][1] extends Record<never, never>
			? InstanceType<typeof GatewayEventTypes[E][1]['default']>
			: undefined,
	) {
		const filtered = this.gateway_listeners.filter((v) => v[0] == event_name);
		filtered.forEach((v) => v[1](payload));
		return filtered.length > 0;
	}

	/**
	 * Emits the event and calls all the listeners of the internal event emitted.
	 * @param event_name The event name.
	 * @param payload The event payload.
	 * @returns Whether there is at least one listener of the event.
	 */
	async emitInternal<E extends keyof InternalEventTypes>(
		event_name: E,
		payload: InternalEventTypes[E],
	) {
		const filtered = this.internal_listeners.filter((v) => v[0] == event_name);
		filtered.forEach((v) => v[1](payload));
		return filtered.length > 0;
	}

	/**
	 * @deprecated Not yet usable
	 */
	async updatePresence(presenceupdate: BotPresenceUpdate) {
		this.sendWs({
			'op': GatewayCodes.GatewayOpcodes.PRESENCE_UPDATE,
			'd': this.parsePresence(presenceupdate),
		});
	}

	/**
	 * Parses the bot presence update activities and return the whole parsed presence update.
	 * @param presenceupdate The presence update to parse.
	 * @returns The parsed presence update.
	 */
	private parsePresence(presenceupdate: BotPresenceUpdate) {
		const presence = presenceupdate;

		presence.activities = presenceupdate.activities.flatMap((v) => {
			return {
				'name': v.name,
				'type': (typeof v.type == 'string') ? Activity.ActivityType[v.type] : v.type,
			};
		});

		return presence;
	}

	async requestHttp(
		method: 'get' | 'put' | 'post' | 'delete' | 'patch',
		url: string,
		data?: Record<never, never> | undefined,
	) {
		if (method) {
			return axiod[method!](url, data, this.config).catch((reason) => {
				this.emitInternal('ERROR', {
					'name': 'REST_REQUEST_ERROR',
					'type': 'RequestHttpError',
					'message': reason,
					'trace': trace(this.requestHttp),
				});
			});
		}
	}

	/**
	 * Sends the specified data to the gateway. Unless absolutely needed, avoid calling this method to send data.
	 * @param data The data to send to the gateway.
	 */
	sendWs(
		data: {
			'op': GatewayCodes.GatewayOpcodes;
			// deno-lint-ignore ban-types
			'd'?: object | string | number;
		} & Record<string, unknown>,
	) {
		if (this.ws.readyState == this.ws.OPEN) {
			this.ws.send(json(data, { d: {} }));
		}
	}

	#receive(event: MessageEvent) {
		const data = <PayloadStructures.GatewayPayload> JSON.parse(event.data);

		this.emitInternal('DEBUG', {
			'event_type': 'Gateway->MessageEvent',
			'message': `Message received from the Gateway (${data.op}).`,
		});

		switch (data.op) {
			case GatewayCodes.GatewayOpcodes.HELLO:
				this.#identify();
				this.#heartbeat_interval = data.d.heartbeat_interval;
				this.#heartbeater();
				break;

			case GatewayCodes.GatewayOpcodes.HEARTBEAT:
				this.emitInternal('HEARTBEAT', undefined);
				this.#heartbeat();
				break;

			case GatewayCodes.GatewayOpcodes.HEARTBEAT_ACK:
				this.emitInternal('HEARTBEAT_ACK', undefined);
				this.#last_seq = data.d;
				break;

			case GatewayCodes.GatewayOpcodes.DISPATCH:
				this.emitInternal('DISPATCH', { 'event_name': data.t! });

				if (data.t as keyof typeof GatewayEventTypes === 'READY') {
					this.user = new User(this, data.d.user);
					this.#session_id = data.d.session_id;
				}

				this.emitGateway(
					data.t!,
					/// @ts-ignore If GatewayEventTypes[data.t!][1] is undefined, return undefined; otherwise return the correct instance.
					GatewayEventTypes[data.t!][1] &&
						new GatewayEventTypes[data.t!][1]!['default'](this, data.d!),
				);

				break;
		}
	}

	#heartbeat_interval!: number;
	#last_seq!: number;
	#session_id!: number;

	/**
	 * The automated periodical heartbeater.
	 */
	async #heartbeater() {
		((
			cb = () => this.#heartbeat(),
			min = 0,
			max = this.#heartbeat_interval,
		) => {
			let num: number;
			const call = () => {
				clearTimeout(num);

				num = setTimeout(
					() => {
						call();
						cb();
					},
					Math.random() * (max - min) + min,
				);
			};

			call();
		})();
	}

	/**
	 * The method to send an `IDENTIFY` request to the gateway.
	 */
	async #identify() {
		this.sendWs({
			'op': GatewayCodes.GatewayOpcodes.IDENTIFY,
			'd': {
				'token': this.options.token,
				'intents': this.options.intents,

				'properties': {
					'$os': Deno.build.os,
					'$browser': 'dinocord',
					'$device': 'Deno ' + Deno.version.deno,
				},

				'presence': this.options.presence,
			},
		});
	}

	async #heartbeat() {
		this.emitInternal('HEARTBEAT', undefined);

		if (this.ws.readyState == this.ws.OPEN) {
			if (this.#last_seq) {
				this.sendWs({
					'op': GatewayCodes.GatewayOpcodes.HEARTBEAT,
					'd': this.#last_seq,
				});
			} else {
				this.sendWs({
					'op': GatewayCodes.GatewayOpcodes.HEARTBEAT,
				});
			}
		} else {
			this.#resume().then(() => this.#heartbeat());
		}
	}

	async #resume() {
		this.ws = new WebSocket(DISCORD_WS_BASEURL);

		this.sendWs({
			'op': GatewayCodes.GatewayOpcodes.RESUME,
			'd': {
				'token': this.options.token,
				'session_id': this.#session_id,
				'seq': this.#last_seq,
			},
		});
	}

	/**
	 * Handles the gateway close event.
	 * @param code The close code.
	 */
	async #closed(code: GatewayCodes.GatewayCloseEventCodes & number) {
		const message_table: Record<GatewayCodes.GatewayCloseEventCodes, string> = {
			4000: 'An unknown error occured. Try reconnecting?',
			4001: 'An invalid Gateway opcode or payload was sent.',
			4002: 'An invalid payload was sent.',
			4003: 'A payload was sent before authentication.',
			4004: 'An invalid token was specified. Authentication failed.',
			4005: 'An IDENTIFY payload was sent after authentication.',
			4007: 'An invalid sequence ID was provided while resuming. Try reconnecting?',
			4008: 'Too much payloads have been sent quickly!',
			4009: 'The session timed out. Try reconnecting?',
			4010: 'An invalid shard was sent while IDENTIFYing.',
			4011: 'Sharding required to connect.',
			4012: 'Invalid API version.',
			4013:
				'Invalid Gateway Intents. Try recalculating the bitwise value for the Gateway Intents before reconnecting.',
			4014: 'Disallowed Gateway Intents. Enable or remove unapproved Intents before reconnecting.',
		};

		this.emitInternal('ERROR', {
			'name': GatewayCodes.GatewayCloseEventCodes[code],
			'type': 'GatewayCloseEvent',
			'message': message_table[code],
			'trace': trace(this.#closed),
		});

		if (
			[
				GatewayCodes.GatewayCloseEventCodes.UNKNOWN_OPCODE,
				GatewayCodes.GatewayCloseEventCodes.DECODE_ERROR,
				GatewayCodes.GatewayCloseEventCodes.NOT_AUTHENTICATED,
				GatewayCodes.GatewayCloseEventCodes.INVALID_SEQ,
			].includes(code)
		) {
			this.#resume();
		} else if (
			[
				GatewayCodes.GatewayCloseEventCodes.UNKNOWN_ERROR,
				GatewayCodes.GatewayCloseEventCodes.ALREADY_AUTHENTICATED,
				GatewayCodes.GatewayCloseEventCodes.RATE_LIMITED,
				GatewayCodes.GatewayCloseEventCodes.SESSION_TIMED_OUT,
			].includes(code)
		) {
			this.#identify();
		}
	}
}
