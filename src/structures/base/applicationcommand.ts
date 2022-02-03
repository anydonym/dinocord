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
