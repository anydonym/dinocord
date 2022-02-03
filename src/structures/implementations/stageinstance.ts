import GatewayClient from '../../gateway/client.ts';
import { IdBase } from '../idbase.a.ts';
import StageInstancePayload from '../base/stageinstance.ts';
import { ChannelType } from '../base/channel.ts';

export * as Base from '../base/stageinstance.ts';

export default class StageInstance extends IdBase implements StageInstancePayload {
	declare readonly id;
	readonly guild_id;
	readonly channel_id;
	topic;
	privacy_level;
	discoverable_disabled;
	type: ChannelType.GUILD_STAGE_VOICE;
	position;
	permission_overwrites;
	parent_id?;

	constructor(public client: GatewayClient, payload: StageInstancePayload) {
		super(payload.id);

		this.guild_id = payload.guild_id;
		this.channel_id = payload.channel_id;
		this.topic = payload.topic;
		this.privacy_level = payload.privacy_level;
		this.discoverable_disabled = payload.discoverable_disabled;
		this.type = payload.type;
		this.position = payload.position;
		this.permission_overwrites = payload.permission_overwrites;
		this.parent_id = payload.parent_id;
	}
}
