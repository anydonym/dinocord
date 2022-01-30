export const Channel = {
  GET_CHANNEL:                    (channel_id: string) =>
    ['get',     `/channels/${channel_id}`],
  MODIFY_CHANNEL:                 (channel_id: string) =>
    ['patch',   `/channels/${channel_id}`],
  DELETE_CHANNEL:                 (channel_id: string) =>
    ['delete',  `/channels/${channel_id}`],

  GET_CHANNEL_MESSAGES:           (channel_id: string) =>
    ['get',     `/channels/${channel_id}/messages`],
  GET_CHANNEL_MESSAGE:            (channel_id: string, message_id: string) =>
    ['get',     `/channels/${channel_id}/messages/${message_id}`],

  CREATE_MESSAGE:                 (channel_id: string) =>
    ['post',    `/channels/${channel_id}/messages`],
  CROSSPOST_MESSAGE:              (channel_id: string, message_id: string) =>
    ['post',    `/channels/${channel_id}/messages/${message_id}/crosspost`],

  EDIT_CHANNEL_PERMISSIONS:       (channel_id: string, overwrite_id: string) =>
    ['put',     `/channels/${channel_id}/permissions/${overwrite_id}`],

  GET_CHANNEL_INVITES:            (channel_id: string) =>
    ['get',     `/channels/${channel_id}/invites`],
  CREATE_CHANNEL_INVITES:         (channel_id: string) =>
    ['post',    `/channels/${channel_id}/invites`],

  DELETE_CHANNEL_PERMISSION:      (channel_id: string, overwrite_id: string) =>
    ['delete',  `/channels/${channel_id}/permissions/${overwrite_id}`]
};

export const Message = {
  CREATE_REACTION:                (channel_id: string, message_id: string, emoji: string) =>
    ['put',     `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`],
  DELETE_OWN_REACTION:            (channel_id: string, message_id: string, emoji: string) =>
    ['delete',  `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`],
  DELETE_USER_REACTION:           (channel_id: string, message_id: string, emoji: string, user_id: string) =>
    ['delete',  `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/${user_id}`],
  GET_REACTIONS:                  (channel_id: string, message_id: string, emoji: string) =>
    ['get',     `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}`],
  DELETE_ALL_REACTIONS:           (channel_id: string, message_id: string) =>
    ['delete',  `/channels/${channel_id}/messages/${message_id}/reactions`],
  DELETE_ALL_REACTIONS_FOR_EMOJI: (channel_id: string, message_id: string, emoji: string) =>
    ['delete',  `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}`],

  EDIT_MESSAGE:                   (channel_id: string, message_id: string) =>
    ['patch',   `/channels/${channel_id}/messages/${message_id}`],
  DELETE_MESSAGE:                 (channel_id: string, message_id: string) =>
    ['delete',  `/channels/${channel_id}/messages/${message_id}`],
  BULK_DELETE_MESSAGES:           (channel_id: string) =>
    ['post',    `/channels/${channel_id}/messages/bulk-delete`]
};