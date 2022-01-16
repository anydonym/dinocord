/**
 * The base class. Contains an ID variable and a default toString() method.
 */
export default abstract class IdBase {
  /** The object's ID. */
  readonly id:  string;

  constructor (id: string) {
    this.id = id;
  }

  toString(): string {
    return `[${this.constructor.name} ${this.id}]`;
  }
}