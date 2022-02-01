import { IdBase } from '../idbase.a.ts';
import ChannelPayload from '../base/channel.ts';
import GatewayClient from '../../gateway/client.ts';
// import { ChannelEndpoints, MessageEndpoints } from '../../gateway/endpoints.ts';
import * as RestStructures from '../../gateway/resources/reststructures.ts';

export default class Channel extends IdBase implements ChannelPayload {
	declare readonly id;
	type;
	readonly guild_id?;
	position?;
	permission_overwrites?;
	name?;
	topic?;
	nsfw?;
	last_message_id?;
	bitrate?;
	user_limit?;
	rate_limit_per_user?;
	recipents;
	icon?;
	owner_id?;
	application_id?;
	parent_id?;
	last_pin_timestamp?;
	rtc_region?;
	video_quality_mode?;
	message_count?;
	member_count?;
	thread_metadata;
	member?;
	default_auto_archive_duration?;
	permissions?;

	/**
	 * Constructs a new Channel instance.
	 * @param payload The Channel payload.
	 */
	constructor(public client: GatewayClient, payload: ChannelPayload) {
		super(payload.id);

		this.type = payload.type;
		this.guild_id = payload.guild_id;
		this.position = payload.position;
		this.permission_overwrites = payload.permission_overwrites;
		this.name = payload.name;
		this.topic = payload.topic;
		this.nsfw = payload.nsfw;
		this.last_message_id = payload.last_message_id;
		this.bitrate = payload.bitrate;
		this.user_limit = payload.user_limit;
		this.rate_limit_per_user = payload.rate_limit_per_user;
		this.recipents = payload.recipents;
		this.icon = payload.icon;
		this.owner_id = payload.owner_id;
		this.application_id = payload.application_id;
		this.parent_id = payload.parent_id;
		this.last_pin_timestamp = payload.last_pin_timestamp;
		this.rtc_region = payload.rtc_region;
		this.video_quality_mode = payload.video_quality_mode;
		this.message_count = payload.message_count;
		this.member_count = payload.member_count;
		this.thread_metadata = payload.thread_metadata;
		this.member = payload.member;
		this.default_auto_archive_duration = payload.default_auto_archive_duration;
		this.permissions = payload.permissions;
	}

	createMessage(messageOptions: RestStructures.CREATE_MESSAGE) {
		messageOptions;
		if (
			messageOptions.content || messageOptions.embeds || messageOptions.sticker_ids ||
			messageOptions.file
		) {
		} else {
			this.client.emitInternal('ERROR', {
				'name': 'EMPTY_MESSAGE',
				'type': 'MessageCreateError',
				'message': 'At least 1 field (content, embeds, sticker_ids, files) must be present.',
			});
		}
	}
}
