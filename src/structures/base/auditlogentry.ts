import Role from './role.ts';
import PermissionOverwrite from './permissionoverwrite.ts';

/**
 * The Audit Log Entry payload structure.
 */
export default interface AuditLogEntry {
	/** The affected entity ID. */
	target_id?: string;
	/** The changes made to the targetted entity. */
	changes?: AuditLogChange[];
	/** The ID of the user who made the changes.*/
	user_id?: string | undefined;
	/** The entry ID. */
	id: string;
	/** The action type. */
	action_type: AuditLogEvent;
	/** The additional info. Available for certain action types. */
	options?: OptionalAuditEntryInfo;
	/** The reason for the change. */
	reason?: string;
}

/**
 * Discord "mixed" type.
 */
type mixed = string | number | boolean | Partial<Role> | PermissionOverwrite;

/**
 * The changes within an instance of audit log.
 */
export interface AuditLogChange {
	new_value?: mixed;
	old_value?: mixed;
	key: string;
}

/**
 * The Audit Log Events list.
 */
export enum AuditLogEvent {
	GUILD_UPDATE = 1,
	CHANNEL_CREATE = 10,
	CHANNEL_UPDATE = 11,
	CHANNEL_DELETE = 12,
	CHANNEL_OVERWRITE_CREATE = 13,
	CHANNEL_OVERWRITE_UPDATE = 14,
	CHANNEL_OVERWRITE_DELETE = 15,
	MEMBER_KICK = 20,
	MEMBER_PRUNE = 21,
	MEMBER_BAN_ADD = 22,
	MEMBER_BAN_REMOVE = 23,
	MEMBER_UPDATE = 24,
	MEMBER_ROLE_UPDATE = 25,
	MEMBER_MOVE = 26,
	MEMBER_DISCONNECT = 27,
	BOT_ADD = 28,
	ROLE_CREATE = 30,
	ROLE_UPDATE = 31,
	ROLE_DELETE = 32,
	INVITE_CREATE = 40,
	INVITE_UPDATE = 41,
	INVITE_DELETE = 42,
	WEBHOOK_CREATE = 50,
	WEBHOOK_UPDATE = 51,
	WEBHOOK_DELETE = 52,
	EMOJI_CREATE = 60,
	EMOJI_UPDATE = 61,
	EMOJI_DELETE = 62,
	MESSAGE_DELETE = 72,
	MESSAGE_BULK_DELETE = 73,
	MESSAGE_PIN = 74,
	MESSAGE_UNPIN = 75,
	INTEGRATION_CREATE = 80,
	INTEGRATION_UPDATE = 81,
	INTEGRATION_DELETE = 82,
	STAGE_INSTANCE_CREATE = 83,
	STAGE_INSTANCE_UPDATE = 84,
	STAGE_INSTANCE_DELETE = 85,
	STICKER_CREATE = 90,
	STICKER_UPDATE = 91,
	STICKER_DELETE = 92,
	GUILD_SCHEDULED_EVENT_CREATE = 100,
	GUILD_SCHEDULED_EVENT_UPDATE = 101,
	GUILD_SCHEDULED_EVENT_DELETE = 102,
	THREAD_CREATE = 110,
	THREAD_UPDATE = 111,
	THREAD_DELETE = 112,
}

/**
 * The Optional Audit Entry information payload structure.
 */
export interface OptionalAuditEntryInfo {
	/** Channel in which the entities were targeted. */
	channel_id?: string;
	/** The number of entities that were targeted. */
	count?: string;
	/** The number of days which inactive members are pruned. */
	delete_member_days?: string;
	/** The ID of the overwritten entity. */
	id?: string;
	members_removed?: string;
	message_id?: string;
	role_name?: '0' | '1';
	type?: '0' | '1';
}
