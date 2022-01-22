export default interface MessageReference {
  message_id?: bigint;
  channel_id?: bigint;
  guild_id?: bigint;
  fall_if_not_exists?: boolean;
}