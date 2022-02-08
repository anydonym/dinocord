import * as Activity from '../structures/base/activity.ts';
import * as PayloadStructures from './resources/payloadstructures.ts';
import * as GatewayCodes from './resources/codes.ts';

import RestEndpoints from './restendpoints.ts';
import GatewayClientOptions, {
	BotPresenceUpdate,
	GatewayIntents,
	GatewayPresenceUpdate,
} from './options.ts';
import GatewayEventTypes from './resources/gatewayevents.ts';
import InternalEventTypes, {
	ErrorEvent as InternalErrorEvent,
} from './resources/internalevents.ts';
import {
	DINOCORD_GITHUB_URL,
	DINOCORD_VERSION,
	DISCORD_REST_BASEURL,
	DISCORD_WS_BASEURL,
} from '../constants.ts';
import { GET_GATEWAY_BOT } from './resources/reststructures.ts';

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
		this.requestHttp(RestEndpoints.GET_GATEWAY_BOT[0], RestEndpoints.GET_GATEWAY_BOT[1]()).then(
			(response) => {
				response.json().then((_json) => {
					const json = _json as GET_GATEWAY_BOT;

					if (json.session_start_limit.remaining == 0) {
						this.emitInternal(
							'ERROR',
							error(
								'SESSION_START_LIMIT_HIT',
								trace(this.connect),
								json.session_start_limit.reset_after.toString(),
							),
						);
					}

					if (this.options.sharding) {
						if (this.options.sharding.enable) {
							this.options.sharding.number = Math.ceil(
								json.shards * 1000 *
									(1000 / (this.options.sharding.override_guilds_per_shard ?? 1000)),
							);
						}
					}
				});
			},
		);

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
		this.ws.addEventListener('close', (event) => {
			this.emitInternal('CLIENT_EVENT', {
				'name': 'WEBSOCKET_CLOSE',
				'message': `Websocket has been closed (${event.code}).`,
			});

			this.#error(event.code);
		});
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
		const length =
			this.internal_listeners.filter((v) => v[0] == event_name).flatMap((v) => v[1](payload))
				.length > 0;

		if (event_name == 'ERROR') {
			if (!length && (payload as InternalErrorEvent).severity == 'fatal') {
				throw `fatal error occured.`;
			}
		}

		return length;
	}

	/**
	 * Updates the bot presence to the specified presence update object.
	 * @param presenceupdate The presence to update.
	 */
	async updatePresence(presenceupdate: Partial<GatewayPresenceUpdate>) {
		this.sendWs({
			'op': GatewayCodes.GatewayOpcodes.PRESENCE_UPDATE,
			'd': this.parsePresence(Object.assign({
				'since': null,
				'afk': false,
				'status': this.options.presence?.status,
				'activities': this.options.presence?.activities ?? [],
			} as GatewayPresenceUpdate, presenceupdate)),
		});
	}

	/**
	 * Parses the bot presence update activities and return the whole parsed presence update.
	 * @param presenceupdate The presence update to parse.
	 * @returns The parsed presence update.
	 */
	private parsePresence(presenceupdate: { activities: BotPresenceUpdate['activities'] }) {
		const presence = presenceupdate;

		presence.activities = presenceupdate.activities.flatMap((v) => {
			return {
				'name': v.name,
				'type': (typeof v.type == 'string') ? Activity.ActivityType[v.type] : v.type,
			};
		});

		return presence;
	}

	/**
	 * Make a HTTP request from the client. Uses native Fetch API.
	 * @param method The HTTP request method.
	 * @param route The route to request.
	 * @param data The data to send. Not necessary.
	 * @param baseroute The base route. Defaults to Discord default HTTP base route.
	 * @returns The native Fetch API promise.
	 */
	async requestHttp(
		method: 'get' | 'put' | 'post' | 'delete' | 'patch',
		route: string,
		data?: Record<never, never> | undefined,
		baseroute: string = DISCORD_REST_BASEURL,
	) {
		const requestMethod = method.toUpperCase(), requestroute = baseroute + route;

		this.emitInternal('REST_DEBUG', {
			'route': route,
			'method': requestMethod,
		});

		const promise = fetch(requestroute, {
			'body': JSON.stringify(data),
			'headers': this.config.headers,
			'method': requestMethod,
		});

		promise.then((response) => {
			switch (response.status) {
				case 401:
					this.emitInternal('ERROR', error('HTTP_401_INVALID_TOKEN', trace(this.requestHttp)));
					break;
				case 403:
					this.emitInternal('ERROR', error('HTTP_403_PERMISSION_ERROR', trace(this.requestHttp)));
					break;
				case 429:
					this.emitInternal('ERROR', error('HTTP_429_RATELIMITED', trace(this.requestHttp)));
					break;
			}
		}).catch((reason) => {
			this.emitInternal('ERROR', {
				'name': 'REST_REQUEST_ERROR',
				'message': JSON.stringify(reason),
				'severity': 'moderate',
				'trace': trace(this.requestHttp),
			});
		});

		return promise;
	}

	/**
	 * Sends the specified data to the gateway. Unless absolutely needed, avoid calling this method to send data.
	 * @param data The data to send to the gateway.
	 */
	sendWs(
		data: PayloadStructures.GatewayPayload,
	) {
		if (this.ws.readyState == this.ws.OPEN) {
			this.ws.send(json(data as unknown as Record<string, unknown>, { d: {} }));
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
				this.#hb_ghost_count = 0;
				this.emitInternal('WEBSOCKET_DEBUG', debug('RECEIVE_HEARTBEAT_ACK'));
				this.ws.latency = Date.now() - this.#hb_sent;
				break;

			case GatewayCodes.GatewayOpcodes.DISPATCH:
				this.#last_seq = data.s ?? null;

				if (data.t === 'READY') {
					this.user = new User(this, data.d.user);
					this.#session_id = data.d.session_id;
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
	#hb_ghost_count = 0;

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
					async () => {
						this.#hb_ghost_count += 1;

						if (this.#hb_ghost_count == 3) {
							this.emitInternal(
								'ERROR',
								error('WEBSOCKET_GHOST_CONNECTION', trace(this.#heartbeater)),
							);
							await this.disconnect(1001);
							await this.connect();
						}

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
				'shard': this.options.sharding ? [0, this.options.sharding.number] : undefined,
			},
		} as PayloadStructures.Identify);
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
			const message_table: Record<
				GatewayCodes.GatewayCloseEventCodes,
				[string, InternalErrorEvent['severity']]
			> = {
				4000: ['An unknown error occured. Try reconnecting?', 'severe'],
				4001: ['An invalid Gateway opcode or payload was sent.', 'severe'],
				4002: ['An invalid payload was sent.', 'severe'],
				4003: ['A payload was sent before authentication.', 'severe'],
				4004: ['An invalid token was specified. Authentication failed.', 'fatal'],
				4005: ['An IDENTIFY payload was sent after authentication.', 'moderate'],
				4007: ['An invalid sequence ID was provided while resuming. Try reconnecting?', 'severe'],
				4008: ['Too much payloads have been sent quickly!', 'severe'],
				4009: ['The session timed out. Try reconnecting?', 'moderate'],
				4010: ['An invalid shard was sent in the IDENTIFY payload.', 'fatal'],
				4011: ['Sharding required to connect.', 'fatal'],
				4012: ['Invalid API version.', 'fatal'],
				4013: [
					'Invalid Gateway Intents. Try recalculating the bitwise value for the Gateway Intents before reconnecting.',
					'fatal',
				],
				4014: [
					'Disallowed Gateway Intents. Enable or remove unapproved Intents before reconnecting.',
					'fatal',
				],
			};

			if (message_table[code as keyof typeof message_table]) {
				const [message, severity] = message_table[code as keyof typeof message_table];
				this.emitInternal('ERROR', {
					'name': GatewayCodes.GatewayCloseEventCodes[code],
					'message': message,
					'severity': severity,
					'trace': trace(this.#error),
				});

				if (severity == 'fatal') {
					return;
				} else if (
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
