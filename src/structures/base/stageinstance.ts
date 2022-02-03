import { BaseChannel, ChannelType, GuildChannel } from './channel.ts';

/**
 * The Stage Instance payload structure.
 */
export default interface StageInstance extends BaseChannel, GuildChannel {
	channel_id: string;
	type: ChannelType.GUILD_STAGE_VOICE;
	topic: string;
	privacy_level: StagePrivacyLevel;
	discoverable_disabled: boolean;
}

/**
 * The possible values for privacy level.
 */
export enum StagePrivacyLevel {
	PUBLIC = 1,
	GUILD_ONLY = 2,
}
