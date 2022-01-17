import AuditLogEntry from './auditlogentry.ts';
import GuildScheduledEvent from './guildscheduledevent.ts';
import Channel from '../implementations/channel.ts';
import User from '../implementations/user.ts';
import Webhook from '../implementations/webhook.ts';

/**
 * Discord Audit Log.
 */
export default interface AuditLog {
  audit_log_entries: AuditLogEntry[];
  guild_scheduled_events: GuildScheduledEvent[];
  integrations: Partial<Integration>[];
  threads: Channel[];
  users: User[];
  webhooks: Webhook[];
}