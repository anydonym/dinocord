export default interface Embed {
	/** The embed title. */
	title?: string | undefined;
	/** The embed description. */
	description?: string | undefined;
	/** The embed URL, set on the title part of the embed. */
	url?: string | undefined;
	/** The embed timestamp. Must be a valid ISO8601 timestamp. */
	timestamp?: string | undefined;
	/** The embed color. */
	color?: number | undefined;
	/** The embed footer. */
	footer?: EmbedFooter | undefined;
	/** The embed image. */
	image?: EmbedImage | undefined;
	/** The embed thumbnail. */
	thumbnail?: EmbedThumbnail | undefined;
	/** The embed video. */
	video?: EmbedVideo | undefined;
	/** The embed provider. */
	provider?: EmbedProvider | undefined;
	/** The embed author. */
	author?: EmbedAuthor | undefined;
	/** The embed fields. */
	fields?: EmbedField[] | undefined;
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
