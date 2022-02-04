import GatewayClient from '../../gateway/client.ts';
import { IdBase } from '../idbase.a.ts';
import WebhookPayload from '../base/webhook.ts';
import { EXECUTE_WEBHOOK } from '../../gateway/resources/reststructures.ts';
import trace from '../../util/trace.ts';
import RestEndpoints from '../../gateway/restendpoints.ts';
import { error } from '../../util/messages.ts';
import Embed from '../embed.ts';

export * as Base from '../base/webhook.ts';

export default class Webhook extends IdBase implements WebhookPayload {
	/** The webhook ID. */
	declare readonly id;
	readonly type;
	readonly guild_id?;
	readonly channel_id?;
	user?;
	name?;
	avatar?;
	token?;
	readonly application_id?;
	readonly source_guild;
	// readonly source_channel;
	url?;

	constructor(public client: GatewayClient, payload: WebhookPayload) {
		super(payload.id);

		this.type = payload.type;
		this.guild_id = payload.guild_id;
		this.channel_id = payload.channel_id;
		this.user = payload.user;
		this.name = payload.name;
		this.avatar = payload.avatar;
		this.token = payload.token;
		this.application_id = payload.application_id;
		this.source_guild = payload.source_guild;
		// this.source_channel = payload.source_channel;
		this.url = payload.url;
	}

	executeWebhook(content: EXECUTE_WEBHOOK) {
		if (this.token) {
			if (content.content || content.file || content.embeds) {
				if (
					(content.embeds ?? []).length > 10 ||
					(content.embeds ?? []).filter((e) =>
							e instanceof Embed ? !e.validate() : !new Embed(e).validate()
						).length != 0
				) {
					this.client.emitInternal(
						'ERROR',
						error('EMBED_VALIDATION_ERROR', trace(this.executeWebhook)),
					);
					return;
				}

				return this.client.requestHttp(
					RestEndpoints.EXECUTE_WEBHOOK[0],
					RestEndpoints.EXECUTE_WEBHOOK[1](this.id, this.token),
					content,
				);
			} else {
				this.client.emitInternal('ERROR', error('EMPTY_MESSAGE', trace(this.executeWebhook)));
				return;
			}
		} else {
			this.client.emitInternal('ERROR', error('WEBHOOK_TOKEN_MISSING', trace(this.executeWebhook)));
		}
	}

	static async get(
		client: GatewayClient,
		webhook_id: string,
		webhook_token?: string,
	): Promise<Webhook | void> {
		let method, url;

		if (webhook_token) {
			method = RestEndpoints.GET_WEBHOOK_WITH_TOKEN[0];
			url = RestEndpoints.GET_WEBHOOK_WITH_TOKEN[1](webhook_id, webhook_token);
		} else {
			method = RestEndpoints.GET_WEBHOOK[0];
			url = RestEndpoints.GET_WEBHOOK[1](webhook_id);
		}

		return client.requestHttp(method, url).then((response) => {
			if (response) return response.json().then((payload) => new Webhook(client, payload));
		}).catch((err) => {
			client.emitInternal('ERROR', error('FETCH_ERROR', trace(Webhook.get), 'Webhook', err));
		});
	}
}
