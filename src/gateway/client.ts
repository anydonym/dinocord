import GatewayOptions, { GatewayIntents } from './options.ts';
import { GatewayEventTypes } from './resources/gatewayevents.ts';
import { GatewayOpcodes } from './resources/codes.ts';
import * as PayloadStructures from './resources/structures.ts';

import { DISCORD_GATEWAY_URL } from '../constants.ts';
import bitwiseCheck from '../util/bitwisecheck.ts';
import * as Activity from '../structures/base/activity.ts';

export default class GatewayClient {
  private ws!: WebSocket;
  private options: GatewayOptions;
  private listeners: [keyof GatewayEventTypes, Function][];

  get websocket() {
    return this.ws;
  }

  get gatewayOptions() {
    return this.options;
  }

  constructor (options: GatewayOptions) {
    this.options = options;
    this.listeners = [];
  }

  /**
   * Facilitate a connection to the Discord gateway.
   */
  connect() {
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

    console.log('gateway opening')
    this.ws = new WebSocket(DISCORD_GATEWAY_URL);

    this.ws.addEventListener('message', (event) => {
      console.log(event.data.op)
      this.#receive(event);
    });

    this.ws.addEventListener('open', () => {
      console.log('gateway opened!')
    });

    this.ws.addEventListener('close', (ev) => {
      console.log('close code', ev.code);

      this.ws = new WebSocket(DISCORD_GATEWAY_URL)

      this.ws.onopen = (open) => {
        this.#send({
          'op': GatewayOpcodes.RESUME,
          'd': {
            'token': this.options.token,
            'seq': this.#last_seq,
            'session_id': this.#session_id
          }
        })
      }
    })
  }

  /**
   * Listens to the event.
   * @param callback The callback function to call.
   * @requires E (event name) to be specified.
   * @returns This instance of client.
   */
  listen<E extends keyof GatewayEventTypes>(eventName: E, callback: (parameters: GatewayEventTypes[E], rawpayload: object) => void) {
    this.listeners.push([eventName, callback]);
    return this;
  }


  #send(data: { 'op': GatewayOpcodes, 'd'?: object } & object) {
    console.log(JSON.stringify(data))
    this.ws.send(JSON.stringify(data));
  }

  #receive(event: MessageEvent) {
    let data = <PayloadStructures.GatewayPayload> JSON.parse(event.data);
    console.log('received: ' + event.data)
    console.log('opcode: ', data.op)
    switch (data.op) {
      case GatewayOpcodes.HELLO:
        console.log('Hello!')
        this.#heartbeat_interval = data.d.heartbeat_interval;

        this.#send({
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
      
      case GatewayOpcodes.HEARTBEAT:
        console.log('Gateway requested a Heartbeat');
        this.#immediateHeartbeat();

      case GatewayOpcodes.HEARTBEAT_ACK:
        console.log('Heartbeat ACK')
        this.#heartbeat_received = true;
        this.#last_seq = data.d;

      case GatewayOpcodes.DISPATCH:
        console.log('Dispatch');
        if (data.t as keyof GatewayEventTypes === 'READY') {
          this.#session_id = data.d.session_id;
        }
    }
  }

  #heartbeat_interval!: number;
  #heartbeat_received!: boolean;
  #last_seq!: number;
  #session_id!: number;

  async #heartbeater() {
    function randomInterval(callback: () => void, min: number, max: number) {
      let timeout: any;
  
      const stop = () => clearTimeout(timeout)
      const tick = () => {
        let time = Math.random() * (max - min) + min;
        stop();

        timeout = setTimeout(() => {
            tick();
            callback();
        }, time)
      }
  
      tick();
    }

    console.log('Heartbeating...')
    randomInterval(() => this.#send({ 'op': GatewayOpcodes.HEARTBEAT }), 0, this.#heartbeat_interval);
    this.#heartbeat_received = false;
  }

  async #immediateHeartbeat() {
    this.#heartbeat_received = false;
    this.#send({ 'op': GatewayOpcodes.HEARTBEAT });
  }
}