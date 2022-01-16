export default interface AuditLog {
  audit_log_entries: AuditLogEntry[];
  guild_scheduled_events: GuildScheduledEvent[];
  integrations: Partial<Integration>[];
  threads: Channel[];
  users: User[];
  webhooks: Webhook[];
}