/**
 * The base ID class. Contains an ID property and a default toString() method.
 */
export abstract class IdBase {
	/** The object ID. */
	readonly id: string;

	constructor(id: string) {
		this.id = id;
	}

	toString(): string {
		return `[object ${this.constructor.name} ${this.id}]`;
	}
}

/**
 * The base ID class with ID being optional. Contains an optional ID property and a default toString() method.
 */
export abstract class OptionalIdBase {
	/** The object ID. */
	readonly id?: string;

	constructor(id?: string) {
		this.id = id;
	}

	toString(): string {
		return `[object ${this.constructor.name}${this.id ? ' ' + this.id : 'unknown'}]`;
	}
}
