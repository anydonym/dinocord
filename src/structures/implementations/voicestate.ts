import GatewayClient from '../../gateway/client.ts';
import VoiceStatePayload from '../base/voicestate.ts';

export * as Base from '../base/voicestate.ts';

export default class VoiceState implements VoiceStatePayload {
	guild_id?;
	channel_id;
	readonly user_id;
	readonly member?;
	readonly session_id;
	deaf;
	mute;
	self_deaf;
	self_mute;
	self_stream?;
	self_video;
	suppress;
	request_to_speak_timestamp?;

	constructor(public client: GatewayClient, payload: VoiceStatePayload) {
		this.guild_id = payload.guild_id;
		this.channel_id = payload.channel_id;
		this.user_id = payload.user_id;
		this.member = payload.member;
		this.session_id = payload.session_id;
		this.deaf = payload.deaf;
		this.mute = payload.self_mute;
		this.self_deaf = payload.self_deaf;
		this.self_mute = payload.self_mute;
		this.self_stream = payload.self_stream;
		this.self_video = payload.self_video;
		this.suppress = payload.suppress;
		this.request_to_speak_timestamp = payload.request_to_speak_timestamp;
	}
}
