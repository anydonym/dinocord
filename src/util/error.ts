import { ErrorEvent } from '../gateway/resources/internalevents.ts';

export const Errors = {
	'EMPTY_MESSAGE':
		'Empty Message. At least 1 field (content, embeds, sticker_ids, files) must be present.',
	'WEBHOOK_TOKEN_MISSING':
		'Cannot find the token for the webhook. Must be present to execute the webhook.',
	'EMBED_VALIDATION_ERROR':
		'Validation for the embeds of the specified content failed. Refer to https://discord.com/developers/docs/resources/channel#embed-limits for more.',
	'INVALID_CHANNEL_TYPE':
		'The action executed requires channel type other than the current channel type.',
};

export default function error<E extends keyof typeof Errors>(name: E, trace: string) {
	return {
		'name': name,
		'message': Errors[name],
		'trace': trace,
	} as ErrorEvent;
}
