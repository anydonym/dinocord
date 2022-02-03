import GatewayClient from '../../gateway/client.ts';
import { IdBase } from '../idbase.a.ts';
import MessagePayload, { MessageFlags } from '../base/message.ts';
import bitwiseCheck from '../../util/bitwisecheck.ts';
// import Channel from './channel.ts';
import { CREATE_MESSAGE as MessageContent } from '../../gateway/resources/reststructures.ts';
import RestEndpoints from '../../gateway/restendpoints.ts';
import Channel from './channel.ts';
import trace from '../../util/trace.ts';

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

	async messageChannel() {
		const method = RestEndpoints.GET_CHANNEL[0];
		const url = RestEndpoints.GET_CHANNEL[1](this.channel_id);

		return this.client.requestHttp(method, url, undefined).then((response) => {
			if (response) return response.json().then((payload) => new Channel(this.client, payload));
		}).catch((err) => {
			this.client.emitInternal('ERROR', {
				'name': 'CHANNEL_FETCH_ERROR',
				'type': 'GetMessageChannel',
				'message': `Cannot get the channel ${this.channel_id}. ${err}`,
				'trace': trace(this.messageChannel),
			});

			return;
		});
	}

	async reply(content: Omit<MessageContent, 'reference'>) {
		if ((content.embeds ?? []).filter((e) => !e.validate()).length != 0) {
			this.client.emitInternal('ERROR', {
				'name': 'EMBED_VALIDATION_ERROR',
				'type': 'MessageReplyCreation',
				'message': 'Validation for the embeds of the specified content failed.',
				'trace': trace(this.reply),
			});
			return;
		}

		const method = RestEndpoints.CREATE_MESSAGE[0];
		const url = RestEndpoints.CREATE_MESSAGE[1](this.channel_id);

		const _content = content;
		_content['message_reference'] = {
			'message_id': this.id,
			'channel_id': this.channel_id,
			'guild_id': this.guild_id,
			'fall_if_not_exists': true,
		};

		return this.client.requestHttp(method, url, _content);
	}
}
