import { ApplicationCommandType } from './applicationcommand.ts';
import { ChannelType } from './channel.ts';

export default interface ApplicationCommandOption {
	type: ApplicationCommandType;
	name: string;
	description: string;
	required?: boolean;
	choices?: ApplicationCommandOptionChoice;
	options?: ApplicationCommandOption[];
	channel_types?: ChannelType[];
	min_value?: number;
	max_value?: number;
	autocomplete?: boolean;
}

/**
 * The Application Command Option choice structure.
 */
export interface ApplicationCommandOptionChoice {
	/** 1-100 character choice name. */
	name: string;
	/** Value of the choice. Up to 100 characters if string. */
	value: string | number;
}

export enum ApplicationCommandOptionType {
	/** Text-based command that shows up when the user types slash. */
	CHAT_INPUT = 1,
	/** UI-based command that shows up when you right click or tap on a user. */
	USER = 2,
	/** UI-based command that shows up when an user right click or tap on a message. */
	MESSAGE = 3,
}
