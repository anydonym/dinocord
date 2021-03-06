import GatewayClient from '../../gateway/client.ts';
import { IdBase } from '../idbase.a.ts';
import MessagePayload, { MessageFlags } from '../base/message.ts';
import bitwiseCheck from '../../util/bitwisecheck.ts';
import { CREATE_MESSAGE } from '../../gateway/resources/reststructures.ts';
import RestEndpoints from '../../gateway/restendpoints.ts';
import Channel from './channel.ts';
import trace from '../../util/trace.ts';
import { error } from '../../util/messages.ts';
import Embed from '../embed.ts';
import User from './user.ts';
import Guild from './guild.ts';
import { ErrorEvent } from '../../gateway/resources/internalevents.ts';

export * as Base from '../base/message.ts';

export default class Message extends IdBase implements MessagePayload {
	declare readonly id;
	channel_id;
	guild_id?;
	author;
	member?;
	content;
	timestamp;
	edited_timestamp?;
	tts;
	mention_everyone;
	mentions;
	mention_roles;
	mention_channels?;
	attachments;
	embeds;
	reactions?;
	nonce?;
	pinned;
	webhook_id?;
	type;
	activity?;
	application?;
	application_id?;
	message_reference?;
	flags?;
	referenced_message?;
	interaction?;
	thread?;
	components?;
	sticker_items?;

	/**
	 * Constructs a new Message instance.
	 * @param payload The Message payload.
	 */
	constructor(public client: GatewayClient, payload: MessagePayload) {
		super(payload.id);

		this.channel_id = payload.channel_id;
		this.guild_id = payload.guild_id;
		this.author = payload.author;
		this.member = payload.member;
		this.content = payload.content;
		this.timestamp = payload.timestamp;
		this.edited_timestamp = payload.edited_timestamp;
		this.tts = payload.tts;
		this.mention_everyone = payload.mention_everyone;
		this.mentions = payload.mentions;
		this.mention_roles = payload.mention_roles;
		this.mention_channels = payload.mention_channels;
		this.attachments = payload.attachments;
		this.embeds = payload.embeds;
		this.reactions = payload.reactions;
		this.nonce = payload.nonce;
		this.pinned = payload.pinned;
		this.webhook_id = payload.webhook_id;
		this.type = payload.type;
		this.activity = payload.activity;
		this.application = payload.application;
		this.application_id = payload.application_id;
		this.message_reference = payload.message_reference;
		this.flags = payload.flags;
		this.referenced_message = payload.referenced_message;
		this.interaction = payload.interaction;
		this.thread = payload.thread;
		this.components = payload.components;
		this.sticker_items = payload.sticker_items;
	}

	get messageFlags() {
		return bitwiseCheck(this.flags ?? 0, MessageFlags);
	}

	async getChannel(): Promise<Channel | ErrorEvent> {
		return this.client.requestHttp(
			RestEndpoints.GET_CHANNEL[0],
			RestEndpoints.GET_CHANNEL[1](this.channel_id),
			undefined,
		).then(async (response) => {
			return response.json().then((payload) => new Channel(this.client, payload));
		}).catch((err) => {
			const e = error('FETCH_ERROR', trace(this.getChannel), 'channel', err);
			this.client.emitInternal('ERROR', e);

			return e;
		});
	}

	async getAuthor() {
		return new User(this.client, this.author);
	}

	async getGuild(): Promise<Guild | ErrorEvent> {
		if (this.guild_id) {
			return this.client.requestHttp(
				RestEndpoints.GET_GUILD[0],
				RestEndpoints.GET_GUILD[1](this.guild_id),
			).then(async (res) => {
				return res.json().then((json) => new Guild(this.client, json));
			}).catch((err) => {
				const e = error('FETCH_ERROR', trace(this.getGuild), 'guild', err);
				this.client.emitInternal('ERROR', e);

				return e;
			});
		} else {
			const e = error(
				'INVALID_TYPE',
				trace(this.getGuild),
				'Message.getGuild()',
				'message',
				'sent in a guild',
			);
			this.client.emitInternal('ERROR', e);

			return e;
		}
	}

	async reply(content: Omit<CREATE_MESSAGE, 'reference'>) {
		if (content.content || content.file || content.embeds) {
			if (
				(content.embeds ?? []).filter((e) =>
					e instanceof Embed ? !e.validate() : !new Embed(e).validate()
				).length != 0
			) {
				this.client.emitInternal('ERROR', error('EMBED_VALIDATION_ERROR', trace(this.reply)));
				return;
			}

			const _content = content;
			_content['message_reference'] = {
				'message_id': this.id,
				'channel_id': this.channel_id,
				'guild_id': this.guild_id,
				'fall_if_not_exists': true,
			};

			return this.client.requestHttp(
				RestEndpoints.CREATE_MESSAGE[0],
				RestEndpoints.CREATE_MESSAGE[1](this.channel_id),
				_content,
			);
		} else {
			const e = error('EMPTY_MESSAGE', trace(this.reply));
			this.client.emitInternal('ERROR', e);

			return e;
		}
	}
}
