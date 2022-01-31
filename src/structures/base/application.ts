import User from "./user.ts";
import Team from "./team.ts";

/**
 * The Application payload structure.
 */
export default interface Application {
  /** The application ID. */
  id: string;
  /** The application name. */
  name: string;
  /** The icon hash of the application. */
  icon?: string | undefined;
  /** The application description. */
  description: string;
  /** An array of RPC origins for the application, if RPC is enabled. */
  rpc_origins?: string[];
  /** Whether the application bot is public. */
  bot_public: boolean;
  /** Whether the application bot requires code grant. */
  bot_require_code_grant: boolean;
  /** The URL to the application terms of service. */
  terms_of_service_url?: string;
  /** The URL to the application privacy policy. */
  privacy_policy_url?: string;
  /** The partial information of the application owner. */
  owner?: Partial<User>;
  /** The application summary. */
  summary: string;
  /** The application verify key. */
  verify_key: string;
  /** The team the application belongs to. */
  team?: Team | undefined;
  /** If this application is a game sold on Discord, will be the guild which it is linked to. */
  guild_id?: string;
  /** If this application is a game sold on Discord, will be the ID of the Game SKU that is created, if exists/ */
  primary_sku_id?: string;
  /** If this application is a game sold on Discord, will be the URL slug which links to the store page. */
  slug?: string;
  /** The application default RPC invite cover image hash. */
  cover_image?: string;
  /** The application public flags. */
  flags?: ApplicationFlags;
}

export enum ApplicationFlags {
  GATEWAY_PRESENCE = 1 << 12,
  GATEWAY_PRESENCE_LIMITED = 1 << 13,
  GATEWAY_GUILD_MEMBERS = 1 << 14,
  GATEWAY_GUILD_MEMBERS_LIMITED = 1 << 15,
  VERIFICATION_PENDING_GUILD_LIMIT = 1 << 16,
  EMBEDDED = 1 << 17,
  GATEWAY_MESSAGE_CONTENT = 1 << 18,
  GATEWAY_MESSAGE_CONTENT_LIMITED = 1 << 19,
}
