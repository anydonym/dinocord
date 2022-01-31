import { IdBase } from "../idbase.a.ts";
import ApplicationPayload from "../base/application.ts";

export default class Application extends IdBase implements ApplicationPayload {
  /** The application ID. */
  declare readonly id;
  name;
  icon?;
  description;
  rpc_origins?;
  bot_public;
  bot_require_code_grant;
  terms_of_service_url?;
  privacy_policy_url?;
  owner?;
  summary;
  verify_key;
  team?;
  guild_id?;
  primary_sku_id?;
  slug?;
  cover_image?;
  flags?;

  /**
   * Constructs a new Application instance.
   * @param payload The Application payload.
   */
  constructor(payload: ApplicationPayload) {
    super(payload.id);

    this.name = payload.name;
    this.icon = payload.icon;
    this.description = payload.description;
    this.rpc_origins = payload.rpc_origins;
    this.bot_public = payload.bot_public;
    this.bot_require_code_grant = payload.bot_require_code_grant;
    this.terms_of_service_url = payload.terms_of_service_url;
    this.privacy_policy_url = payload.privacy_policy_url;
    this.owner = payload.owner;
    this.summary = payload.summary;
    this.verify_key = payload.verify_key;
    this.team = payload.team;
    this.guild_id = payload.guild_id;
    this.primary_sku_id = payload.primary_sku_id;
    this.slug = payload.slug;
    this.cover_image = payload.cover_image;
    this.flags = payload.flags;
  }
}
