import GatewayOptions, { GatewayIntents } from './options.ts';
import { GatewayEventTypes } from './resources/gatewayevents.ts';
import { GatewayOpcodes } from './resources/codes.ts';
import * as PayloadStructures from './resources/structures.ts';

import { DISCORD_GATEWAY_URL } from '../constants.ts';
import bitwiseCheck from '../util/bitwisecheck.ts';

export default class GatewayClient {
  options: GatewayOptions;

  heartbeat_interval?: number;

  constructor (options: GatewayOptions) {
    this.options = options;
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
      throw new Error(`Invalid Intents: Intents must be a sum of bitwise values of (1 << x). Got: ${this.options.intents}`);


    throw new Error('Unimplemented.');
  }

  close() {
    throw new Error('Unimplemented.');
  }

  private async handleMessage(event: MessageEvent) {
    let json = <PayloadStructures.GatewayPayload> JSON.parse(event.data);
    
  }

  /**
   * Listens to the event.
   * @param callback The callback function to call.
   * @requires E (event name) to be specified.
   */
  listen<E extends keyof typeof GatewayEventTypes>(callback: (parameters: typeof GatewayEventTypes[E], rawdata: object) => void) {
    throw new Error('Unimplemented.')
  }
}