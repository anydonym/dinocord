import EmbedPayload, {
	EmbedAuthor,
	EmbedField,
	EmbedFooter,
	EmbedImage,
	EmbedProvider,
	EmbedThumbnail,
	EmbedVideo,
} from './base/embed.ts';

export * as Base from './base/embed.ts';

export default class Embed implements EmbedPayload {
	title?: string;
	description?: string;
	url?: string;
	timestamp?: string;
	color?: number;
	footer?: EmbedFooter;
	image?: EmbedImage;
	thumbnail?: EmbedThumbnail;
	video?: EmbedVideo;
	provider?: EmbedProvider;
	author?: EmbedAuthor;
	fields?: EmbedField[];

	/**
	 * Constructs a new Embed instance.
	 * @param payload The payload structure.
	 */
	constructor(payload?: EmbedPayload) {
		if (payload) {
			this.title = payload.title;
			this.description = payload.description;
			this.url = payload.url;
			this.timestamp = payload.timestamp;
			this.color = payload.color;
			this.footer = payload.footer;
			this.image = payload.image;
			this.thumbnail = payload.thumbnail;
			this.video = payload.video;
			this.provider = payload.provider;
			this.author = payload.author;
			this.fields = payload.fields;
		}
	}

	/**
	 * Sets the embed title.
	 * @param title The embed title.
	 */
	setTitle(title?: typeof this.title) {
		this.title = title;
	}

	/**
	 * Sets the embed description.
	 * @param description The embed description.
	 */
	setDescription(description?: typeof this.description) {
		this.description = description;
	}

	/**
	 * Sets the embed URL.
	 * @param url The embed URL.
	 */
	setURL(url?: typeof this.url) {
		this.url = url;
	}

	/**
	 * Sets the embed timestamp.
	 * @param timestamp The embed timestamp. Must be a valid ISO8601 timestamp.
	 */
	setTimestamp(timestamp?: typeof this.timestamp) {
		this.timestamp = timestamp;
	}

	/**
	 * Sets the embed color.
	 * @param color The embed color.
	 */
	setColor(color?: typeof this.color) {
		if (color) {
			this.color = (color > 0xFFFFFF) ? undefined : color;
		}
	}

	/**
	 * Sets the embed footer.
	 * @param footer The embed footer.
	 */
	setFooter(footer?: typeof this.footer) {
		this.footer = Object.assign(this.footer ?? {}, footer);
	}

	/**
	 * Sets the embed image.
	 * @param image The embed image.
	 */
	setImage(image?: typeof this.image) {
		this.image = Object.assign(this.image ?? {}, image);
	}

	/**
	 * Sets the embed thumbnail.
	 * @param thumbnail The embed thumbnail.
	 */
	setThumbnail(thumbnail?: typeof this.thumbnail) {
		this.thumbnail = Object.assign(this.thumbnail ?? {}, thumbnail);
	}

	/**
	 * Sets the embed video.
	 * @param video The embed video.
	 */
	setVideo(video?: typeof this.video) {
		this.video = Object.assign(this.video ?? {}, video);
	}

	/**
	 * Sets the embed provider.
	 * @param provider The embed provider.
	 */
	setProvider(provider?: typeof this.provider) {
		this.provider = Object.assign(this.provider ?? {}, provider);
	}

	/**
	 * Sets the embed author.
	 * @param author The embed author.
	 */
	setAuthor(author?: typeof this.author) {
		this.author = Object.assign(this.author ?? {}, author);
	}

	/**
	 * Sets the embed fields.
	 * @param fields The fields to add to or replace.
	 * @param operation What dinocord should do with the fields. `enhance` to add the fields to the current fields list, or `override` to force an override, given that `fields` is not undefined in both cases.
	 */
	setFields(fields?: typeof this.fields, operation?: 'enhance' | 'override') {
		if (operation == 'enhance') {
			this.fields = (this.fields ?? []).concat(...(fields ?? []));
		} else {
			this.fields = fields ?? [];
		}
	}

	toString(type: 'json' | 'string' = 'string') {
		return type == 'json'
			? JSON.stringify({
				'author': this.author,
				'title': this.title,
				'color': this.color,
				'description': this.description,
				'url': this.url,
				'timestamp': this.timestamp,
				'footer': this.footer,
				'image': this.image,
				'thumbnail': this.thumbnail,
				'video': this.video,
				'provider': this.provider,
				'fields': this.fields,
			})
			: `[object ${this.constructor.name} "${this.title}"]`;
	}

	/**
	 * Checks if the Embed is valid. If not, passing it through the gateway will result in a `Bad Request` response.
	 * @returns Whether the Embed instance is valid.
	 */
	validate() {
		const title_len = (this.title ?? '').length,
			description_len = (this.description ?? '').length,
			author_name_len = (this.author ?? { 'name': '' }).name.length,
			footer_text_len = (this.footer ?? { 'text': '' }).text.length,
			fields_checkobjlen = (this.fields ?? []).length <= 25,
			fields_values_checkcharlen =
				(this.fields ?? []).flatMap((v) => v.name.length <= 256 && v.value.length <= 1024).filter((
					v,
				) => !v).length == 0,
			fields_values_charlen = (this.fields ?? []).flatMap((v) => v.name.length + v.value.length)
				.reduce((p, v) => p + v, 0);

		return title_len <= 256 && description_len <= 4096 && author_name_len <= 256 &&
			footer_text_len <= 2048 && fields_checkobjlen && fields_values_checkcharlen &&
			(title_len + description_len + author_name_len + footer_text_len + fields_values_charlen <=
				6000);
	}
}
