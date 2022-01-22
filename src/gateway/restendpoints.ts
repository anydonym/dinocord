export const Channel = {
  GET_CHANNEL: (channel_id: string) => ['get', `/channels/${channel_id}`],
  MODIFY_CHANNEL: (channel_id: string) => ['patch', `/channels/${channel_id}`],
  DELETE_CHANNEL: (channel_id: string) => ['delete', `/channels/${channel_id}`],

  GET_CHANNEL_MESSAGES: (channel_id: string) => ['get', `/channels/${channel_id}/messages`],
  GET_CHANNEL_MESSAGE: (channel_id: string, message_id: string) => ['get', `/channels/${channel_id}/messages/${message_id}`],

  CREATE_MESSAGE: (channel_id: string) => ['post', `/channels/${channel_id}/messages`],
  CROSSPOST_MESSAGE: (channel_id: string, message_id: string) => ['post', `/channels/${channel_id}/messages/${message_id}/crosspost`]
};

export const Message = {
  CREATE_REACTION: (channel_id: string, message_id: string, emoji: string) => ['put', `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`],
  DELETE_OWN_REACTION: (channel_id: string, message_id: string, emoji: string) => ['delete', `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`]
};