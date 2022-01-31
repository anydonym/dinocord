/**
 * The Client Status object structure.
 */
export default interface ClientStatus {
  desktop?: ClientStatusType;
  mobile?: ClientStatusType;
  web?: ClientStatusType;
}

/**
 * The possible types of client status.
 */
export enum ClientStatusType {
  ONLINE = "online",
  IDLE = "idle",
  DND = "dnd",
}
