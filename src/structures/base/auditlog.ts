import AuditLogEntry from './auditlogentry.ts';
import GuildScheduledEvent from './guildscheduledevent.ts';

export default interface AuditLog {
  audit_log_entries:      AuditLogEntry[];
  guild_scheduled_events: GuildScheduledEvent[];
  integrations:           Partial<Integration>[];
  threads:                Channel[];
  users:                  User[];
  webhooks:               Webhook[];
}