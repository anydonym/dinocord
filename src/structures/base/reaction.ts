import Emoji from './emoji.ts';

/**
 * The Reaction payload structure.
 */
export default interface Reaction {
  /** The number of times the reaction emoji has been reacted to. */
  count: number;
  /** Whether the current user also reacted to the message using the reaction. */
  me: boolean;
  /** Partial emoji information. */
  emoji: Partial<Emoji>;
}