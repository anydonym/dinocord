import AuditLogEntry from './auditlogentry.ts';
import GuildScheduledEvent from './guildscheduledevent.ts';
import Channel from '../implementations/channel.ts';
import User from '../implementations/user.ts';
import Webhook from '../implementations/webhook.ts';
import Integration from "../implementations/integration.ts";

/**
 * The Audit Log payload structure.
 */
export default interface AuditLog {
  /** The list of audit log entries. */
  audit_log_entries: AuditLogEntry[];
  /** The list of guild scheduled events found in the audit log. */
  guild_scheduled_events: GuildScheduledEvent[];
  /** The list of partial integration objects. */
  integrations: Partial<Integration>[];
  /** The list of associated thread channels. */
  threads: Channel[];
  /** The list of associated users. */
  users: User[];
  /** The list of associated webhooks. */
  webhooks: Webhook[];
}