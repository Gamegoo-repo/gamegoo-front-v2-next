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
  JWT_UPDATE: {
    CONNECTION: "connection-update-token",
    EXPIRED: "jwt-expired-error"
  }
} as const;
