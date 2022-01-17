export default interface ClientStatus {
  desktop?: ClientStatusType;
  mobile?: ClientStatusType;
  web?: ClientStatusType;
}

export enum ClientStatusType {
  ONLINE  = 'online',
  IDLE    = 'idle',
  DND     = 'dnd'
}