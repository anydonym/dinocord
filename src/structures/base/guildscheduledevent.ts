import User from './user.ts';

export default interface GuildScheduledEvent {
  id: bigint;
  guild_id: bigint;
  channel_id?: bigint;
  creator: User;
  creator_id?: bigint;
  name: string;
  description?: string;
  scheduled_start_time: string;
  scheduled_end_time?: string;
  privacy_level: 2;
  status: 1 | 2 | 3 | 4;
  entity_type: EntityType;
  entity_id?: bigint;
  entity_metadata?: EntityMetadata;
  user_count?: number;
}

export enum EntityType {
  STAGE_INSTANCE,
  VOICE,
  EXTERNAL
}

export interface EntityMetadata {
  location?: string;
}