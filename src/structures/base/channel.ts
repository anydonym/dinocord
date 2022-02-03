import PermissionOverwrite from './permissionoverwrite.ts';
import User from './user.ts';
import ThreadMetadata from './threadmetadata.ts';
import ThreadMember from './threadmember.ts';
import { StagePrivacyLevel } from './stageinstance.ts';

export default interface Channel {
	id: string;
	type: ChannelType;
	guild_id?: string;
	position?: number;
	permission_overwrites?: PermissionOverwrite[];
	name?: string;
	topic?: string;
	nsfw?: boolean;
	last_message_id?: string;
	bitrate?: number;
	user_limit?: number;
	rate_limit_per_user?: number;
	recipents?: User[];
	icon?: string;
	owner_id?: string;
	application_id?: string;
	parent_id?: string;
	last_pin_timestamp?: string;
	rtc_region?: string;
	video_quality_mode?: number;
	message_count?: number;
	member_count?: number;
	thread_metadata: ThreadMetadata;
	member?: ThreadMember;
	default_auto_archive_duration?: number;
	permissions?: string;
	privacy_level?: StagePrivacyLevel;
	discoverable_disabled?: boolean;
}

export interface BaseChannel {
	id: string;
	type: ChannelType;
}

export interface TextChannel {
	last_message_id: string;
}

export interface GuildChannel {
	guild_id: string;
	position: number;
	permission_overwrites: PermissionOverwrite[];
	parent_id?: string;
}

export interface GuildTextChannel extends BaseChannel, TextChannel, GuildChannel {
	type: ChannelType.GUILD_TEXT;
	nsfw: boolean;
	rate_limit_per_user: number;
	topic: string;
	default_auto_archive_duration?: number;
}

export interface GuildVoiceChannel extends BaseChannel, GuildChannel {
	type: ChannelType.GUILD_VOICE;
	nsfw: boolean;
	bitrate: number;
	user_limit: number;
	rtc_region?: string;
}

export interface DMChannel extends BaseChannel, TextChannel {
	type: ChannelType.DM;
	recipents: Partial<User>[];
}

export interface GroupDMChannel extends BaseChannel, TextChannel {
	recipents: Partial<User>[];
	owner_id: string;
}

export interface ThreadChannel extends BaseChannel, GuildChannel, TextChannel {
	type:
		| ChannelType.GUILD_NEWS_THREAD
		| ChannelType.GUILD_PUBLIC_THREAD
		| ChannelType.GUILD_PRIVATE_THREAD;
	message_count: number;
	member_count: number;
	rate_limit_per_user: number;
	thread_metadata: ThreadMetadata;
}

export enum ChannelType {
	GUILD_TEXT = 0,
	DM = 1,
	GUILD_VOICE = 2,
	GROUP_DM = 3,
	GUILD_CATEGORY = 4,
	GUILD_NEWS = 5,
	GUILD_STORE = 6,
	GUILD_NEWS_THREAD = 10,
	GUILD_PUBLIC_THREAD = 11,
	GUILD_PRIVATE_THREAD = 12,
	GUILD_STAGE_VOICE = 13,
}
