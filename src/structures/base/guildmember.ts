import User from './user.ts';

export default interface GuildMember {
	/** The user associated with the guild member instance. */
	user?: User;
	/** The user guild nickname. */
	nick?: string;
	/** The user guild avatar hash. */
	avatar?: string;
	/** The IDs of the roles that this user has. */
	roles?: string[];
	/** The ISO8601 timestamp that the user has joined the server. */
	joined_at: string;
	/** The ISO8601 timestamp that the user has started boosting the server. */
	premium_since?: string;
	/** Whether the user is deafened in voice channels. */
	deaf: boolean;
	/** Whether the user is muted in voice channels. */
	mute: boolean;
	/** Whether the user has not passed the Membership Screening. */
	pending?: boolean;
	/** The permissions that the user has in this guild. */
	permissions?: string;
	/** When the user timeout expires in this guild, if the user is timed out. */
	communication_disabled_until?: string;
}
