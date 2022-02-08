import ApplicationCommandOption from './applicationcommandoption.ts';

export default interface ApplicationCommand {
	id: string;
	type?: ApplicationCommandType;
	application_id: string;
	guild_id?: string;
	name: string;
	description: string;
	options?: ApplicationCommandOption[];
	default_permission?: boolean;
	version: string;
}

export enum ApplicationCommandType {
	CHAT_INPUT = 1,
	USER = 2,
	MESSAGE = 3,
}

/**
 * The Guild Application Command Permissions structure. Returned when fetching the permissions for a command in guild.
 */
export interface GuildApplicationCommandPermissions {
	id: string;
	application_id: string;
	guild_id: string;
	permissions: ApplicationCommandPermissions[];
}

/**
 * The Application Command Permissions structure. Allows you to enable/disable commands for specific targets within a guild.
 */
export interface ApplicationCommandPermissions {
	id: string;
	type: ApplicationCommandPermissionType;
	permission: boolean;
}

export enum ApplicationCommandPermissionType {
	ROLE = 1,
	USER = 2,
}
