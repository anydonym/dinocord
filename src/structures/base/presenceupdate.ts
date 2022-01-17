import User from '../implementations/user.ts';
import Activity from './activity.ts';
import ClientStatus from './clientstatus.ts';

export default interface PresenceUpdate {
  /** The user this presence update belongs to. */
  user: User;
  /** The guild ID. */
  guild_id: string;
  /** The status that the User set. */
  status: Status;
  /** The user's current activities. */
  activities: Activity[];
  /** The user's status across platforms. */
  client_status: ClientStatus;
}

export enum Status {
  IDLE      = 'idle',
  DND       = 'dnd',
  ONLINE    = 'online',
  OFFLINE   = 'offline'
}