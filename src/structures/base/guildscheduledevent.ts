import User from "./user.ts";

export default interface GuildScheduledEvent {
  id: string;
  guild_id: string;
  channel_id?: string;
  creator: User;
  creator_id?: string;
  name: string;
  description?: string;
  scheduled_start_time: string;
  scheduled_end_time?: string;
  privacy_level: 2;
  status: 1 | 2 | 3 | 4;
  entity_type: EntityType;
  entity_id?: string;
  entity_metadata?: EntityMetadata;
  user_count?: number;
}

export enum EntityType {
  STAGE_INSTANCE,
  VOICE,
  EXTERNAL,
}

export interface EntityMetadata {
  location?: string;
}
