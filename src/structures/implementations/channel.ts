import { IdBase } from '../idbase.a.ts';
import ChannelPayload, { ChannelType } from '../base/channel.ts';
import * as Base from '../base/channel.ts';
import GatewayClient from '../../gateway/client.ts';
import RestEndpoints from '../../gateway/restendpoints.ts';
import { CREATE_MESSAGE, CREATE_WEBHOOK } from '../../gateway/resources/reststructures.ts';
import trace from '../../util/trace.ts';
import StageInstance from '../base/stageinstance.ts';
import { error } from '../../util/messages.ts';
import Embed from '../embed.ts';
import { ErrorEvent } from '../../gateway/resources/internalevents.ts';

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
	privacy_level?;
	discoverable_disabled?;

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
		this.privacy_level = payload.privacy_level;
		this.discoverable_disabled = payload.discoverable_disabled;
	}

	async createMessage(content: CREATE_MESSAGE) {
		if (this.isText()) {
			if (
				content.content || content.embeds || content.sticker_ids ||
				content.file
			) {
				if (
					(content.embeds ?? []).filter((e) =>
						e instanceof Embed ? !e.validate() : !new Embed(e).validate()
					).length != 0
				) {
					this.client.emitInternal(
						'ERROR',
						error('EMBED_VALIDATION_ERROR', trace(this.createMessage)),
					);
					return;
				}

				return this.client.requestHttp(
					RestEndpoints.CREATE_MESSAGE[0],
					RestEndpoints.CREATE_MESSAGE[1](this.id),
					content,
				);
			} else {
				this.client.emitInternal('ERROR', error('EMPTY_MESSAGE', trace(this.createMessage)));
				return;
			}
		} else {
			const e = error(
				'INVALID_TYPE',
				trace(this.createMessage),
				'Channel.createMessage',
				'channel',
				'a text channel',
			);
			this.client.emitInternal('ERROR', e);

			return e;
		}
	}

	createWebhook(webhook_information: CREATE_WEBHOOK) {
		if (this.isText()) {
			this.client.requestHttp(
				RestEndpoints.CREATE_WEBHOOK[0],
				RestEndpoints.CREATE_WEBHOOK[1](this.id),
				webhook_information,
			);
		} else {
			const e = error(
				'INVALID_TYPE',
				trace(this.createWebhook),
				'Channel.createWebhook',
				'channel',
				'a text channel',
			);
			this.client.emitInternal(
				'ERROR',
				e,
			);

			return e;
		}
	}

	isText(): this is Base.TextChannel {
		return [
			ChannelType.DM,
			ChannelType.GROUP_DM,
			ChannelType.GUILD_NEWS,
			ChannelType.GUILD_NEWS_THREAD,
			ChannelType.GUILD_PUBLIC_THREAD,
			ChannelType.GUILD_PRIVATE_THREAD,
			ChannelType.GUILD_TEXT,
		].includes(this.type);
	}

	isVoice(): this is Base.GuildVoiceChannel {
		return [ChannelType.GUILD_VOICE].includes(this.type);
	}

	isStageVoice(): this is StageInstance {
		return [ChannelType.GUILD_STAGE_VOICE].includes(this.type);
	}

	isGuild(): this is Base.GuildChannel {
		return this.guild_id !== undefined;
	}

	static async get(client: GatewayClient, channel_id: string): Promise<Channel | ErrorEvent> {
		return client.requestHttp(
			RestEndpoints.GET_CHANNEL[0],
			RestEndpoints.GET_CHANNEL[1](channel_id),
		).then(async (response) => {
			return response.json().then((payload) => new Channel(client, payload));
		}).catch((err) => {
			const e = error('FETCH_ERROR', trace(Channel.get), 'channel', err);
			client.emitInternal('ERROR', e);

			return e;
		});
	}
}
