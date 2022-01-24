import GatewayOptions, { GatewayIntents } from './options.ts';
import GatewayEventTypes from './resources/gatewayevents.ts';
import { GatewayOpcodes } from './resources/codes.ts';
import * as PayloadStructures from './resources/structures.ts';
import InternalEventTypes from './resources/internalevents.ts';
import { DISCORD_GATEWAY_WS } from '../constants.ts';
import bitwiseCheck from '../util/bitwisecheck.ts';
import * as Activity from '../structures/base/activity.ts';

export default class GatewayClient {
  private ws!: WebSocket;
  private options: GatewayOptions;
  private gateway_listeners: [keyof GatewayEventTypes, Function][];
  private internal_listeners: [keyof InternalEventTypes, Function][];
  // private sidelisteners: [keyof SideEventTypes, Function][];

  get websocket() {
    return this.ws;
  }

  get gatewayOptions() {
    return this.options;
  }

  constructor (options: GatewayOptions) {
    this.options = options;
    this.gateway_listeners = [];
    this.internal_listeners = [];
  }

  /**
   * Facilitate a connection to the Discord gateway.
   */
  async connect() {
    if (typeof this.options.intents != 'number')
      this.options.intents = <number> this.options.intents.filter((v, i, a) => a.indexOf(v) == i)
      .reduce((pv, nv) =>
        (typeof pv == 'string' ? GatewayIntents[pv as keyof typeof GatewayIntents] : pv) +
        (typeof nv == 'string' ? GatewayIntents[nv as keyof typeof GatewayIntents] : nv),
        0
      );

    if (!bitwiseCheck(this.options.intents, GatewayIntents))
      throw new Error(`Invalid Intents: Intents must be a bitfield value. Got '${this.options.intents}'.`);

    if (this.options.presence)
      if (this.options.presence.activities)
        this.options.presence.activities = this.options.presence.activities.flatMap((v) => {
          return {
            'name': v.name,
            'type': (typeof v.type == 'string') ? Activity.ActivityType[v.type] : v.type
          }
        });

    this.ws = new WebSocket(DISCORD_GATEWAY_WS);
    this.ws.addEventListener('message', (event) => this.#receive(event));
  }

  /**
   * Listen to the event broadcasted by the gateway.
   * @param event_name The event name.
   * @param callback The callback function.
   * @returns This instance of client.
   */
  listenGateway<E extends keyof GatewayEventTypes>(event_name: E, callback: (payload: GatewayEventTypes[E]) => void) {
    this.gateway_listeners.push([event_name, callback]);
    return this;
  }

  /**
   * Listen to the internal client event, such as debug, error, etc.
   * @param event_name The event name.
   * @param callback The callback function.
   * @returns This instance of client.
   */
  listenInternal<E extends keyof InternalEventTypes>(event_name: E, callback: (payload: InternalEventTypes[E]) => void) {
    this.internal_listeners.push([event_name, callback]);
    return this;
  }

  /**
   * Emits the event and calls all the listeners of the event emitted.
   * @param event_name The event name.
   * @param payload The event payload.
   */
  emitGateway<E extends keyof GatewayEventTypes>(event_name: E, payload: GatewayEventTypes[E]) {
    this.gateway_listeners.filter((v) => v[0] == event_name).forEach((v) => v[1](payload));
  }

  emitInternal<E extends keyof InternalEventTypes>(event_name: E, payload: InternalEventTypes[E]) {
    this.internal_listeners.filter((v) => v[0] == event_name).forEach((v) => v[1](payload));
  }

  #sendWs(data: { 'op': GatewayOpcodes, 'd'?: object } & object) {
    if (this.ws.readyState == this.ws.OPEN)
      this.ws.send(JSON.stringify(Object.assign({ 'd': {} }, data)));
  }

  #receive(event: MessageEvent) {
    let data = <PayloadStructures.GatewayPayload> JSON.parse(event.data);

    this.emitInternal('DEBUG', {
      'event_type': 'Gateway->MessageEvent',
      'message': 'Received a message from the gateway. Opcode: ' + data.op
    });

    switch (data.op) {
      case GatewayOpcodes.HELLO:
        this.#heartbeat_interval = data.d.heartbeat_interval;

        this.#sendWs({
          'op': GatewayOpcodes.IDENTIFY,
          'd': <PayloadStructures.Identify> {
            'token':      this.options.token,
            'intents':    this.options.intents,
      
            'properties': {
              '$os':      Deno.build.os,
              '$browser': 'dinocord',
              '$device':  'Deno ' + Deno.version.deno
            },
      
            'presence':   this.options.presence
          }
        });

        this.#heartbeater();
        break;
      case GatewayOpcodes.HEARTBEAT:
        this.#immediateHeartbeat();
        break;
      case GatewayOpcodes.HEARTBEAT_ACK:
        this.#last_seq = data.d;
        break;
      case GatewayOpcodes.DISPATCH:
        this.emitGateway(data.t as keyof GatewayEventTypes, data.d);
        if (data.t as keyof GatewayEventTypes === 'READY')
          this.#session_id = data.d.session_id;
        break;
    }
  }

  #heartbeat_interval!: number;
  #last_seq!: number;
  #session_id!: number;

  async #heartbeater() {
    ((callback: () => void, min: number, max: number) => {
      let timeout: number, tick = () => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            tick();
            callback();
        }, Math.random() * (max - min) + min)
      }
  
      tick();
    })(() => {
      this.#sendWs({ 'op': GatewayOpcodes.HEARTBEAT });
    }, 0, this.#heartbeat_interval);
  }

  async #immediateHeartbeat() {
    this.#sendWs({ 'op': GatewayOpcodes.HEARTBEAT });
  }
}