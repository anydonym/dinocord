import User from '../implementations/user.ts';
import Application from '../implementation/application.ts';

export default interface Integration {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  syncing?: boolean;
  role_id?: string;
  enable_emoticons?: boolean;
  expire_behavior: 0 | 1;
  expire_grace_period?: number;
  user?: User;
  account: IntegrationAccount;
  synced_at?: string;
  subscriber_count?: number;
  revoked?: boolean;
  application?: Application;
}

export interface IntegrationAccount {
  id: string;
  name: string;
}

export interface IntegrationApplication {
  id: string;
  name: string;
  icon?: string;
  description: string;
  summary: string;
  bot?: User;
}