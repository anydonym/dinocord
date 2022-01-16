import GatewayOptions from './options.ts';

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

  async handleMessage(event: MessageEvent) {
    throw new Error('Unimplemented.');
  }
}