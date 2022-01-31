/**
 * The Permission Overwrite payload structure.
 */
export default interface PermissionOvewrite {
  /** The role/user ID. */
  id: string;
  /**
   * The type of the permission overwrite.
   * Refer to @enum OverwriteType for possible types.
   */
  type: OverwriteType;
  /** Permission bit set allowed. */
  allow: string;
  /** Permission bit set denied */
  deny: string;
}

/**
 * The possible permission overwrite types.
 */
export enum OverwriteType {
  ROLE = 0,
  MEMBER = 1,
}
