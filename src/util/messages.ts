import { ErrorEvent } from '../gateway/resources/internalevents.ts';

export const Errors = {
	'EMPTY_MESSAGE':
		'Empty Message. At least 1 field (content, embeds, sticker_ids, files) must be present.',
	'WEBHOOK_TOKEN_MISSING':
		'Cannot find the token for the webhook. Must be present to execute the webhook.',
	'EMBED_VALIDATION_ERROR':
		'Validation for the embeds of the specified content failed. Refer to https://discord.com/developers/docs/resources/channel#embed-limits for more.',
	'INVALID_CHANNEL_TYPE':
		'The action executed requires channel type other than the current channel type (#{0}).',
	'FETCH_ERROR': 'Cannot fetch the desired #{0}; ${1}',
	'WEBSOCKET_ERROR': 'An unknown error occured. Websocket connection terminated unexpectedly.',
};

export function error<E extends keyof typeof Errors>(
	name: E,
	trace: string,
	...replacer: string[]
) {
	const message = Errors[name];
	replacer.forEach((string, index) => message.replace(`#{${index}}`, string));

	return {
		'name': name,
		'message': message,
		'trace': trace,
	} as ErrorEvent;
}

export const DebugMessages = {
	'SEND_HEARTBEAT': 'Sending HEARTBEAT to the gateway...',
	'RECEIVE_HEARTBEAT_ACK': 'Received HEARTBEAT ACK from the gateway.',
	'SEND_RESUME': 'Sending RESUME to the gateway...',
	'SEND_IDENTIFY': 'Sending IDENTIFY to the gateway...',
};

export function debug<E extends keyof typeof DebugMessages>(
	name: E,
	...replacer: string[]
) {
	const message = DebugMessages[name];
	replacer.forEach((string, index) => message.replace(`#{${index}}`, string));

	return {
		'name': name,
		'message': message,
	};
}
