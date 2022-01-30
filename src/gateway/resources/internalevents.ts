export default interface InternalEvents {
  DEBUG: Debug,
  HEARTBEAT: void,
  HEARTBEAT_ACK: void
}

export interface Debug {
  event_type: string;
  message: string;
}