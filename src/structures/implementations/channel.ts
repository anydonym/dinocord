import { IdBase } from '../idbase.a.ts';
import ChannelPayload from '../base/channel.ts';
import GatewayClient from '../../gateway/client.ts';
import RestEndpoints from '../../gateway/restendpoints.ts';
import { CREATE_MESSAGE as MessageContent } from '../../gateway/resources/reststructures.ts';
import trace from '../../util/trace.ts';

export * as Base from '../base/channel.ts';

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

	async createMessage(content: MessageContent) {
		if (
			content.content || content.embeds || content.sticker_ids ||
			content.file
		) {
			if (content.embeds?.filter((e) => !e.validate()).length != 0) {
				this.client.emitInternal('ERROR', {
					'name': 'EMBED_VALIDATION_ERROR',
					'type': 'MessageCreation',
					'message': 'Validation for the embeds of the specified content failed.',
					'trace': trace(this.createMessage),
				});
				return false;
			}

			const method = RestEndpoints.CREATE_MESSAGE[0];
			const url = RestEndpoints.CREATE_MESSAGE[1](this.id);

			return this.client.requestHttp(method, url, content).then(() => true, () => false);
		} else {
			this.client.emitInternal('ERROR', {
				'name': 'EMPTY_MESSAGE',
				'type': 'MessageCreateError',
				'message': 'At least 1 field (content, embeds, sticker_ids, files) must be present.',
				'trace': trace(this.createMessage),
			});
			return false;
		}
	}
}
