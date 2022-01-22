/**
 * The Stage Instance payload structure.
 */
export default interface StageInstance {
  id: string;
  guild_id: string;
  channel_id: string;
  topic: string;
  privacy_level: StagePrivacyLevel;
  discoverable_disabled: boolean;
}

/**
 * The possible values for privacy level.
 */
export enum StagePrivacyLevel {
  PUBLIC = 1,
  GUILD_ONLY = 2
}