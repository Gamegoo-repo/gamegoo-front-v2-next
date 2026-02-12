export const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  ERROR: "error",
  CHAT: {
    MESSAGE: "chat-message",
    SUCCESS: "my-message-broadcast-success"
  },
  FRIEND: {
    ONLINE: "friend-online",
    OFFLINE: "friend-offline",
    LIST: "init-online-friend-list"
  },
  JWT_ERROR: {
    CONNECTION: "connection-jwt-error",
    EXPIRED: "jwt-expired-error"
  },
  JWT_UPDATE: "connection-update-token"
} as const;
