import * as Activity from '../structures/base/activity.ts';
import * as PayloadStructures from './resources/payloadstructures.ts';
import * as GatewayCodes from './resources/codes.ts';

import GatewayClientOptions, { BotPresenceUpdate, GatewayIntents } from './options.ts';
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

import User from '../structures/implementations/user.ts';
import { debug, error } from '../util/messages.ts';

/**
 * The client class, the interface between the application and the gateway.
 */
export default class GatewayClient {
	/** The websocket. */
	ws!: WebSocket & { latency?: number };
	/** The options used for connecting to the gateway. */
	readonly options: GatewayClientOptions;
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
	constructor(options: GatewayClientOptions) {
		this.options = options;
		this.gateway_listeners = [];
		this.internal_listeners = [];

		this.config = {
			'headers': {
				'Authorization': `Bot ${this.options.token}`,
				'User-Agent': `DiscordBot (${DINOCORD_GITHUB_URL}, ${DINOCORD_VERSION})`,
				'Content-Type': 'application/json',
			},
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
		this.ws.latency = 0;

		this.ws.addEventListener('message', (event) => this.#receive(event));
		this.ws.addEventListener('error', () => this.#error());
		this.ws.addEventListener('close', (event) => this.#error(event.code));
		this.ws.addEventListener(
			'close',
			(event) => console.log(event.code),
		);
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
		return this.gateway_listeners.filter((v) => v[0] == event_name).flatMap((v) => v[1](payload))
			.length > 0;
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
		return this.internal_listeners.filter((v) => v[0] == event_name).flatMap((v) => v[1](payload))
			.length > 0;
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
		baseUrl: string = DISCORD_REST_BASEURL,
	) {
		if (method) {
			const promise = fetch(baseUrl + url, {
				'body': JSON.stringify(data),
				'headers': this.config.headers,
				'method': method.toUpperCase(),
			});

			promise.catch((reason) => {
				this.emitInternal('ERROR', {
					'name': 'REST_REQUEST_ERROR',
					'message': JSON.stringify(reason),
					'trace': trace(this.requestHttp),
				});
			});

			return promise;
		}
	}

	async #readTemp() {
		if (this.options.temporary_file?.use) {
			try {
				const filedata = new TextDecoder().decode(
						Deno.readFileSync(this.options.temporary_file.path!),
					),
					json = JSON.parse(filedata) as {
						last_date: number | null;
						last_seq: number | null;
						session_id: number | null;
					};

				if (json.session_id) {
					this.#session_id = json.session_id;
					this.#last_seq = json.last_seq;
				} else {
					this.connect();
				}
			} catch {
				Deno.writeFileSync(
					this.options.temporary_file.path!,
					new TextEncoder().encode(
						JSON.stringify({ 'last_date': null, 'last_seq': null, 'session_id': null }),
					),
				);
			}
		}
	}

	async #processAck(last_seq: number | null) {
		this.#last_seq = last_seq;

		if (this.options.temporary_file?.use) {
			Deno.writeFileSync(
				this.options.temporary_file.path!,
				new TextEncoder().encode(
					JSON.stringify({
						last_date: Date.now(),
						last_seq: last_seq,
						session_id: this.#session_id,
					}),
				),
			);
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

	async #receive(event: MessageEvent) {
		const data = <PayloadStructures.GatewayPayload> JSON.parse(event.data);

		switch (data.op) {
			case GatewayCodes.GatewayOpcodes.HELLO:
				this.#identify();
				this.#heartbeat_interval = data.d.heartbeat_interval;
				this.#heartbeater();
				break;

			case GatewayCodes.GatewayOpcodes.HEARTBEAT:
				this.emitInternal('WEBSOCKET_DEBUG', {
					'name': 'SEND_HEARTBEAT',
					'message': 'Sending heartbeat to the gateway...',
				});
				this.#heartbeat();
				break;

			case GatewayCodes.GatewayOpcodes.HEARTBEAT_ACK:
				this.emitInternal('WEBSOCKET_DEBUG', debug('RECEIVE_HEARTBEAT_ACK'));
				this.ws.latency = Date.now() - this.#hb_sent;
				break;

			case GatewayCodes.GatewayOpcodes.DISPATCH:
				this.emitInternal('DISPATCH', { 'event_name': data.t! });

				this.#processAck(data.s ?? null);

				if (data.t === 'READY') {
					this.user = new User(this, data.d.user);
					this.#session_id = data.d.session_id;

					// this.#resume();
				}

				if (GatewayEventTypes[data.t!]) {
					this.emitGateway(
						data.t!,
						/// @ts-ignore If GatewayEventTypes[data.t!][1] is not undefined, so is the code below valid.
						GatewayEventTypes[data.t!][1]
							? new GatewayEventTypes[data.t!][1]!['default'](this, data.d!)
							: undefined,
					);
				}

				break;
		}

		return GatewayCodes.GatewayOpcodes[data.op];
	}

	#heartbeat_interval!: number;
	#last_seq!: number | null;
	#session_id!: number;
	#hb_sent!: number;

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
		this.emitInternal('WEBSOCKET_DEBUG', debug('SEND_IDENTIFY'));
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
		this.emitInternal('WEBSOCKET_DEBUG', debug('SEND_HEARTBEAT'));

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

			this.#hb_sent = Date.now();
		}
	}

	async #resume() {
		this.emitInternal('WEBSOCKET_DEBUG', debug('SEND_RESUME'));
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
	async #error(code?: number) {
		if (code) {
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
				4010: 'An invalid shard was sent in the IDENTIFY payload.',
				4011: 'Sharding required to connect.',
				4012: 'Invalid API version.',
				4013:
					'Invalid Gateway Intents. Try recalculating the bitwise value for the Gateway Intents before reconnecting.',
				4014:
					'Disallowed Gateway Intents. Enable or remove unapproved Intents before reconnecting.',
			};

			if (message_table[code as keyof typeof message_table]) {
				this.emitInternal('ERROR', {
					'name': GatewayCodes.GatewayCloseEventCodes[code],
					'message': message_table[code as keyof typeof message_table],
					'trace': trace(this.#error),
				});

				if (
					[
						GatewayCodes.GatewayCloseEventCodes.UNKNOWN_OPCODE,
						GatewayCodes.GatewayCloseEventCodes.DECODE_ERROR,
						GatewayCodes.GatewayCloseEventCodes.NOT_AUTHENTICATED,
						GatewayCodes.GatewayCloseEventCodes.ALREADY_AUTHENTICATED,
						GatewayCodes.GatewayCloseEventCodes.UNKNOWN_ERROR,
						GatewayCodes.GatewayCloseEventCodes.RATE_LIMITED,
						GatewayCodes.GatewayCloseEventCodes.SESSION_TIMED_OUT,
						GatewayCodes.GatewayCloseEventCodes.INVALID_SEQ,
					].includes(code)
				) {
					this.#identify();
				} else {
					this.emitInternal('ERROR', error('WEBSOCKET_ERROR', trace(this.#error), code.toString()));
					this.#identify();
				}
			}
		} else {
			this.emitInternal(
				'ERROR',
				error('WEBSOCKET_ERROR', trace(this.#error), 'unknown error code'),
			);
			this.#identify();
		}
	}
}
