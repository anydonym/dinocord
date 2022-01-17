import User from '../implementations/user.ts';
import Guild from '../implementations/guild.ts';
import Channel from '../implementations/channel.ts';

export default interface Webhook {
  id: string;
  type: number;
  guild_id?: string;
  channel_id?: string;
  user?: User;
  name?: string;
  avatar?: string;
  token?: string;
  application_id?: string;
  source_guild: Partial<Guild>;
  source_channel: Partial<Channel>;
  url?: string;
}