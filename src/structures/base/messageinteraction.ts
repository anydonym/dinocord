import User from './user.ts';

export default interface MessageInteraction {
	id: string;
	type: InteractionType;
	name: string;
	user: User;
}

export enum InteractionType {
	PING = 1,
	APPLICATION_COMMAND = 2,
	MESSAGE_COMPONENT = 3,
	APPLICATION_COMMAND_AUTOCOMPLETE = 4,
}
