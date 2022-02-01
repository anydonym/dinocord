import PermissionOverwrite from '../../structures/base/permissionoverwrite.ts';
import Embed from '../../structures/embed.ts';
import MessageComponent from '../../structures/base/messagecomponent.ts';
import Attachment from '../../structures/base/attachment.ts';

/**
 * @todo Set icon type to binary.
 */
export interface MODIFY_CHANNEL$GROUP_DM {
	name: string;
	icon: number;
}

export interface MODIFY_CHANNEL$GUILD {
	name: string;
	type: number;
	position?: number;
	topic?: string;
	nsfw?: boolean;
	rate_limit_per_user?: number;
	bitrate?: number;
	user_limit?: number;
	permission_overwrites?: PermissionOverwrite[];
	parent_id?: string;
}

export interface MODIFY_CHANNEL$THREAD {
	name: string;
	archived: boolean;
	auto_archive_duration: number;
	locked: boolean;
	invitable: boolean;
	rate_limit_per_user?: number;
}

/**
 * Get message payloads in a channel. If not specified, `limit` is 50.
 * @warning `around`, `before` and `after` are mutually exclusive - only one may be specified.
 */
export interface GET_CHANNEL_MESSAGES {
	around?: string;
	before?: string;
	after?: string;
	limit?: number;
}

export interface CREATE_MESSAGE {
	content?: string;
	tts?: boolean;
	embeds?: Embed[];
	// allowed_mentions?: AllowedMention;
	// message_reference?: MessageReference;
	components?: MessageComponent[];
	sticker_ids?: string[];
	/** @deprecated Not supported yet */
	file: string;
	/** @deprecated Not supported yet */
	payload_json: string;
	attachments?: Partial<Attachment>[];
	flags?: number;
}

export interface CREATE_GUILD_EMOJI {
	name: string;
	image: string;
	roles: string[];
}

export interface MODIFY_GUILD_EMOJI {
	name: string;
	roles: string[] | null;
}

export interface CREATE_GUILD_CHANNEL {
	name: string;
	type: number;
	topic: string;
	bitrate: number;
	user_limit: number;
	rate_limit_per_user: number;
	position: number;
	permission_overwrites: PermissionOverwrite[];
	parent_id: string;
	nsfw: boolean;
}
