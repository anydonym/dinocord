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
 * The Application Command Option Choice structure.
 */
export interface ApplicationCommandOptionChoice {
	/** 1-100 character choice name. */
	name: string;
	/** Value of the choice. Up to 100 characters if string. */
	value: string | number;
}

/**
 * The Application Command Interaction Data Option structure.
 */
export interface ApplicationCommandInteractionDataOption {
	/** The name of the parameter. */
	name: string;
	/** The application command option type. Refer to @enum ApplicationCommandOptionType for more on possible values. */
	type: ApplicationCommandOptionType;
	/** The value of the option resulting from user input. */
	value?: string | number;
	/** Present if this option is a group or subcommand. */
	options?: ApplicationCommandInteractionDataOption[];
	/** Whether the option is the currently focused option for autocomplete. */
	focused?: boolean;
}

export enum ApplicationCommandOptionType {
	SUB_COMMAND = 1,
	SUB_COMMAND_GROUP = 2,
	STRING = 3,
	INTEGER = 4,
	BOOLEAN = 5,
	USER = 6,
	CHANNEL = 7,
	ROLE = 8,
	MENTIONABLE = 9,
	NUMBER = 10
}
