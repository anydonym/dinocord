import { IdBase } from '../idbase.a.ts';
import StickerPayload from '../base/sticker.ts';

export default class Sticker extends IdBase implements StickerPayload {
  declare readonly id;
  pack_id?;
  name;
  description?;
  tags?;
  type?;
  format_type?;
  available?;
  guild_id?;
  user?;
  sort_value?;

  /**
   * Constructs a new Sticker instance.
   */
  constructor (payload: StickerPayload) {
    super(payload.id);

    this.pack_id = payload.pack_id;
    this.name = payload.name;
    this.description = payload.description;
    this.tags = payload.tags;
    this.type = payload.type;
    this.format_type = payload.format_type;
    this.available = payload.available;
    this.guild_id = payload.guild_id;
    this.user = payload.user;
    this.sort_value = payload.sort_value;
  }
}