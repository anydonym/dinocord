export default interface Embed {
  title?: string | undefined;
  description?: string | undefined;
  url?: string | undefined;
  timestamp?: string | undefined;
  color?: number | undefined;
  footer?: EmbedFooter | undefined;
  image?: EmbedImage | undefined;
  thumbnail?: EmbedThumbnail | undefined;
  video?: EmbedVideo | undefined;
  provider?: EmbedProvider | undefined;
  author?: EmbedAuthor | undefined;
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
  inline?: string;
}