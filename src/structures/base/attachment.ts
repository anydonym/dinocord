/**
 * Discord Message Attachment payload structure.
 */
export default interface Attachment {
  /** Attachment ID. */
  id: string;
  /** The attachment file name. */
  filename: string;
  /** The attachment file description. */
  description?: string;
  /** The attachment media type. */
  content_type?: string;
  /** The attachment size in bytes. */
  size: number;
  /** The source URL of the attachment. */
  url: string;
  /* The proxied URL of the attachment. */
  proxy_url: string;
  /** The attachment height, if the attachment is an image. */
  height?: number | undefined;
  /** The attachment width, if the attachment is an image. */
  width?: number | undefined;
  /** Whether this attachment is ephemeral. */
  ephemeral?: boolean;
}
