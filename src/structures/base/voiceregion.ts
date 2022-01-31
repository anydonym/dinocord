/**
 * The Voice Region payload structure.
 */
export default interface VoiceRegion {
  /** Unique ID for the region. */
  id: string;
  /** The region name. */
  name: string;
  /** Whether the region is optimal for the client. */
  optimal: boolean;
  /** Whether the voice region is deprecated. */
  deprecated: boolean;
  /** Whether the voice region is custom (used for events, etc.) */
  custom: boolean;
}
