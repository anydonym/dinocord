import GatewayOptions, { GatewayIntents } from './options.ts';
import GatewayEventTypes from './resources/gatewayevents.ts';
import { GatewayOpcodes } from './resources/codes.ts';
import * as PayloadStructures from './resources/gatewaystructures.ts';
import InternalEventTypes from './resources/internalevents.ts';
import { DISCORD_GATEWAY_WS } from '../constants.ts';
import bitwiseCheck from '../util/bitwisecheck.ts';
import * as Activity from '../structures/base/activity.ts';
import json from '../util/json.ts';

export default class GatewayClient {
  ws!: WebSocket;
  readonly options:   GatewayOptions;
  gateway_listeners:  [keyof GatewayEventTypes, Function][];
  internal_listeners: [keyof InternalEventTypes, Function][];

  /**
   * Build a new Gateway Client.
   * @param options The options to use for the gateway.
   */
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
   * Emits the event and calls all the listeners of the event emitted from the Discord gateway.
   * @param event_name The event name.
   * @param payload The event payload.
   */
  emitGateway<E extends keyof GatewayEventTypes>(event_name: E, payload: GatewayEventTypes[E]) {
    this.gateway_listeners.filter((v) => v[0] == event_name).forEach((v) => v[1](payload));
  }

  /**
   * Emits the event and calls all the listeners of the internal event emitted.
   * @param event_name The event name.
   * @param payload The event payload.
   */
  emitInternal<E extends keyof InternalEventTypes>(event_name: E, payload: InternalEventTypes[E]) {
    this.internal_listeners.filter((v) => v[0] == event_name).forEach((v) => v[1](payload));
  }

  private sendWs(data: { 'op': GatewayOpcodes, 'd'?: object | number | string | null } & object) {
    if (this.ws.readyState == this.ws.OPEN)
      this.ws.send(json(data, { d: {} }));
  }

  #receive(event: MessageEvent) {
    let data = <PayloadStructures.GatewayPayload> JSON.parse(event.data);

    this.emitInternal('DEBUG', {
      'event_type': 'Gateway->MessageEvent',
      'message': `Message received from the Gateway (${data.op}).`
    });

    switch (data.op) {
      case GatewayOpcodes.HELLO:
        this.#hello();
        this.#heartbeat_interval = data.d.heartbeat_interval;
        this.#heartbeater();
        break;

      case GatewayOpcodes.HEARTBEAT:
        this.emitInternal('HEARTBEAT', undefined);
        this.#heartbeat();
        break;

      case GatewayOpcodes.HEARTBEAT_ACK:
        this.emitInternal('HEARTBEAT_ACK', undefined);
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
    ((cb = () => this.#heartbeat(), min = 0, max = this.#heartbeat_interval) => {
      let num: number, call = () => {
        clearTimeout(num);

        num = setTimeout(
          () => { call(); cb(); },
          Math.random() * (max - min) + min
        );
      }
  
      call();
    })();
  }

  async #hello() {
    this.sendWs({
      'op': GatewayOpcodes.IDENTIFY,
      'd': {
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
  }

  async #heartbeat() {
    this.emitInternal('HEARTBEAT', {
      'last_seq': this.#last_seq
    });

    if (this.#last_seq)
      this.sendWs({
        'op': GatewayOpcodes.HEARTBEAT,
        'd': this.#last_seq
      });
    else {
      this.sendWs({
        'op': GatewayOpcodes.HEARTBEAT
      });
    }
  }

  async #resume() {
    this.sendWs({
      'op': GatewayOpcodes.RESUME,
      'd': {
        'token': this.options.token,
        'session_id': this.#session_id,
        'seq': this.#last_seq
      }
    });
  }
}