/**
 * The Thread Member payload structure.
 */
export default interface ThreadMember {
	/** The thread ID. */
	id?: string;
	/** The user ID this thread member represents. */
	user_id?: string;
	/** The time the member last joined the thread. */
	join_timestamp: string;
	/** Any user-thread settings. */
	flags: number;
}
