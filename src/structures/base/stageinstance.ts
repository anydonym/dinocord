/**
 * The Stage Instance payload structure.
 */
export default interface StageInstance {
  id: bigint;
  guild_id: bigint;
  channel_id: bigint;
  topic: string;
  privacy_level: StagePrivacyLevel;
  discoverable_disabled: boolean;
}

export enum StagePrivacyLevel {
  PUBLIC = 1,
  GUILD_ONLY = 2
}