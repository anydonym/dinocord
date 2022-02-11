import GatewayClient from '../../gateway/client.ts';
import { IdBase } from '../idbase.a.ts';
import { GuildPreview as GuildPreviewPayload } from '../base/guild.ts';
import RestEndpoints from '../../gateway/restendpoints.ts';
import { error } from '../../util/messages.ts';
import trace from '../../util/trace.ts';

export { GuildPreview as Base };

export default class GuildPreview extends IdBase implements GuildPreviewPayload {
	declare readonly id;
	name;
	icon?;
	splash?;
	discovery_splash?;
	emojis;
	features;
	description?;
	approximate_member_count;
	approximate_presence_count;
	stickers;

	constructor(public client: GatewayClient, payload: GuildPreviewPayload) {
		super(payload.id);

		this.name = payload.name;
		this.icon = payload.icon;
		this.splash = payload.splash;
		this.discovery_splash = payload.discovery_splash;
		this.emojis = payload.emojis;
		this.features = payload.features;
		this.description = payload.description;
		this.approximate_member_count = payload.approximate_member_count;
		this.approximate_presence_count = payload.approximate_presence_count;
		this.stickers = payload.stickers;
	}

	static async get(client: GatewayClient, guild_id: string): Promise<GuildPreview | void> {
		return client.requestHttp(
			RestEndpoints.GET_GUILD_PREVIEW[0],
			RestEndpoints.GET_GUILD_PREVIEW[1](guild_id),
		).then((response) => {
			if (response) return response.json().then((payload) => new GuildPreview(client, payload));
		}).catch((err) => {
			client.emitInternal(
				'ERROR',
				error('FETCH_ERROR', trace(GuildPreview.get), 'guild preview', err),
			);
		});
	}
}
