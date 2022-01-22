import * as Activity from '../../structures/base/activity.ts';
import * as PresenceUpdate from '../../structures/base/presenceupdate.ts';

export default interface BotPresenceUpdate {
  'activities': {
    'name': string;
    'type': Activity.ActivityType | keyof typeof Activity.ActivityType;
  }[];
  'client_status'?: {
    'desktop'?: PresenceUpdate.Status | PresenceUpdate.Status[keyof PresenceUpdate.Status],
    'web'?: PresenceUpdate.Status | PresenceUpdate.Status[keyof PresenceUpdate.Status],
    'mobile'?: PresenceUpdate.Status | PresenceUpdate.Status[keyof PresenceUpdate.Status]
  },
  'status'?: PresenceUpdate.Status | PresenceUpdate.Status[keyof PresenceUpdate.Status]
}