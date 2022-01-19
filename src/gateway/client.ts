import GatewayOptions from './options.ts';
import { GatewayEventTypes } from './resources/gatewayevents.ts';

export default class GatewayClient {
  options: GatewayOptions;
  ws?: WebSocket;

  constructor (options: GatewayOptions) {
    this.options = options;
  }

  connect() {
    // this.ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');
    throw new Error('Unimplemented.');
  }

  close() {
    throw new Error('Unimplemented.');
  }

  private async handleMessage(event: MessageEvent) {
    throw new Error('Unimplemented.');
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