export default interface MessageReference {
	message_id?: string;
	channel_id?: string;
	guild_id?: string;
	fall_if_not_exists?: boolean;
}
