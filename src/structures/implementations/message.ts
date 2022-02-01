import GatewayClient from '../../gateway/client.ts';
import { IdBase } from '../idbase.a.ts';
import MessagePayload, { MessageFlags } from '../base/message.ts';
import bitwiseCheck from '../../util/bitwisecheck.ts';

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
}
