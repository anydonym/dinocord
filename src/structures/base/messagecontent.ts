import Embed from '../implementations/embed.ts';
import MessageComponent from './messagecomponent.ts';

export type MessageContent =
	| { 'content': string }
	| { 'embeds': Embed[] }
	| { 'files': File[] }
	| { 'sticker_ids': string[] }
		& {
			tts?: boolean;
			// allowed_mentions?: AllowedMention;
			message_reference?: string;
			components: MessageComponent[];
			// attachments: Partial<Attachment>[];
		};
