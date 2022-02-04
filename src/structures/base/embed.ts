export default interface Embed {
	/** The embed title. */
	title?: string;
	/** The embed description. */
	description?: string;
	/** The embed URL, set on the title part of the embed. */
	url?: string;
	/** The embed timestamp. Must be a valid ISO8601 timestamp. */
	timestamp?: string;
	/** The embed color. */
	color?: number;
	/** The embed footer. */
	footer?: EmbedFooter;
	/** The embed image. */
	image?: EmbedImage;
	/** The embed thumbnail. */
	thumbnail?: EmbedThumbnail;
	/** The embed video. */
	video?: EmbedVideo;
	/** The embed provider. */
	provider?: EmbedProvider;
	/** The embed author. */
	author?: EmbedAuthor;
	/** The embed fields. */
	fields?: EmbedField[];
}

export interface EmbedFooter {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface EmbedImage {
	url: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface EmbedThumbnail {
	url: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface EmbedVideo {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface EmbedProvider {
	name?: string;
	url?: string;
}

export interface EmbedAuthor {
	name: string;
	url?: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface EmbedField {
	name: string;
	value: string;
	inline?: boolean;
}
