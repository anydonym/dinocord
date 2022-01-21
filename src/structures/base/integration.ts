import User from './user.ts';
import Application from './application.ts';

export default interface Integration {
  id: bigint;
  name: string;
  type: string;
  enabled: boolean;
  syncing?: boolean;
  role_id?: bigint;
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
  id: bigint;
  name: string;
}

export interface IntegrationApplication {
  id: bigint;
  name: string;
  icon?: string;
  description: string;
  summary: string;
  bot?: User;
}