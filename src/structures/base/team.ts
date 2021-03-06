import User from './user.ts';

/**
 * The Team payload structure.
 */
export default interface Team {
	/** The team icon hash. */
	icon?: string;
	/** The team ID. */
	id: string;
	/** The members of the team. */
	members: TeamMember[];
	/** The team name. */
	name: string;
	/** The ID of the owner of the team. */
	owner_user_id: string;
}

/**
 * The Team Member payload structure.
 */
export interface TeamMember {
	/**
	 * The membership state of a team member.
	 * Refer to @enum MembershipState for possible values.
	 */
	membership_state: MembershipState;
	/** The permissions of this team member. */
	permissions: string[];
	/** The ID of the team which this member belongs to. */
	team_id: string;
	/** The avatar, username, discriminator and ID of the user this member represents. */
	user: Partial<User>;
}

/**
 * The state of membership of a team memberdeno info.
 */
export enum MembershipState {
	INVITED = 1,
	ACCEPTED = 2,
}
