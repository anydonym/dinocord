import GatewayClient from '../../gateway/client.ts';
import { IdBase } from '../idbase.a.ts';
import GuildScheduledEventPayload from '../base/guildscheduledevent.ts';

export default class GuildScheduledEvent extends IdBase implements GuildScheduledEventPayload {
	declare readonly id;
	readonly guild_id;
	channel_id?;
	creator;
	creator_id?;
	name;
	description?;
	scheduled_start_time;
	scheduled_end_time?;
	privacy_level;
	status;
	entity_type;
	entity_id?;
	entity_metadata?;
	user_count?;

	constructor(public client: GatewayClient, payload: GuildScheduledEventPayload) {
		super(payload.id);

		this.guild_id = payload.guild_id;
		this.channel_id = payload.channel_id;
		this.creator = payload.creator;
		this.creator_id = payload.creator_id;
		this.name = payload.name;
		this.description = payload.description;
		this.scheduled_start_time = payload.scheduled_start_time;
		this.scheduled_end_time = payload.scheduled_end_time;
		this.privacy_level = payload.privacy_level;
		this.status = payload.status;
		this.entity_type = payload.entity_type;
		this.entity_id = payload.entity_id;
		this.entity_metadata = payload.entity_metadata;
		this.user_count = payload.user_count;
	}
}
