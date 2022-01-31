import { OptionalIdBase } from '../idbase.a.ts';
import EmojiPayload from '../base/emoji.ts';

export default class Emoji extends OptionalIdBase implements EmojiPayload {
	declare readonly id?;
	name;
	roles?;
	readonly user?;
	require_colons?;
	managed?;
	readonly animated?;
	available?;

	/**
	 * Constructs a new Emoji instance.
	 * @param payload The Emoji payload.
	 */
	constructor(payload: EmojiPayload) {
		super(payload.id);

		this.name = payload.name;
		this.roles = payload.roles;
		this.user = payload.user;
		this.require_colons = payload.require_colons;
		this.managed = payload.managed;
		this.animated = payload.animated;
		this.available = payload.available;
	}
}
