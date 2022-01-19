export enum GatewayOpcodes {
  DISPATCH              = 1,
  HEARTBEAT             = 2,
  IDENTIFY              = 2,
  PRESENCE_UPDATE       = 3,
  VOICE_STATE_UPDATE    = 4,
  RESUME                = 6,
  RECONNECT             = 7,
  REQUEST_GUILD_MEMBERS = 8,
  INVALID_SESSION       = 9,
  HELLO                 = 10,
  HEARTBEAT_ACK         = 11
}

export enum GatewayCloseEventCodes {
  UNKNOWN_ERROR         = 4000,
  UNKNOWN_OPCODE        = 4001,
  DECODE_ERROR          = 4002,
  NOT_AUTHENTICATED     = 4003,
  AUTHENTICATION_FAILED = 4004,
  ALREADY_AUTHENTICATED = 4005,
  INVALID_SEQ           = 4007,
  RATE_LIMITED          = 4008,
  SESSION_TIMED_OUT     = 4009,
  INVALID_SHARD         = 4010,
  SHARDING_REQUIRED     = 4011,
  INVALID_API_VERSION   = 4012,
  INVALID_INTENTS       = 4013,
  DISALLOWED_INTENTS    = 4014
}

export enum VoiceOpcodes {
  IDENTIFY            = 0,
  SELECT_PROTOCOL     = 1,
  READY               = 2,
  HEARTBEAT           = 3,
  SESSION_DESCRIPTION = 4,
  SPEAKING            = 5,
  HEARTBEAT_ACK       = 6,
  RESUME              = 7,
  HELLO               = 8,
  RESUMED             = 9,
  CLIENT_DISCONNECT   = 13
}

export enum VoiceCloseEventCodes {
  UNKNOWN_OPCODE            = 4001,
  FAILED_TO_DECODE_PAYLOAD  = 4002,
  NOT_AUTHENTICATED         = 4003,
  AUTHENTICATION_FAILED     = 4004,
  ALREADY_AUTHENTICATED     = 4005,
  SESSION_NO_LONGER_VALID   = 4006,
  SESSION_TIMEOUT           = 4009,
  SERVER_NOT_FOUND          = 4011,
  UNKNOWN_PROTOCOL          = 4012,
  DISCONNECTED              = 4014,
  VOICE_SERVER_CRASHED      = 4015,
  UNKNOWN_ENCRYPTION_MODE   = 4016
}