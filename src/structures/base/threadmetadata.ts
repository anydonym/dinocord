/**
 * The Thread Metadata payload structure.
 */
export default interface ThreadMetadata {
	/** Whether the thread is archived. */
	archived: boolean;
	/** The duration in minutes the thread will be automatically archived. */
	auto_archive_duration: number;
	/** The timestamp when the thread's archive status was last changed. Used to calculating recent activity. */
	archive_timestamp: string;
	/** Whether the thread is locked. When it is locked, only members with `MANAGE_THREADS` may unarchive it. */
	locked: boolean;
	/** Whether non-moderators can add other users to the thread; only available on private threads. */
	invitable?: boolean;
	/** The timestamp when the thread was created. For threads created after `2022-01-09`. */
	create_timestamp?: string;
}
