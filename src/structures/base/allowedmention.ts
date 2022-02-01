export default interface AllowedMention {
	parse: AllowedMentionTypes[];
	roles: string[];
	users: string[];
	replied_user: boolean;
}

export interface AllowedMentionTypes {
	role: 'roles';
	user: 'users';
	everyone: 'everyone';
}
