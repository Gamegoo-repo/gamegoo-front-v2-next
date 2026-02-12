export const CHAT_HISTORY_QUERY_KEYS = {
  all: ["ChatHistory"] as const,
  uuid: (uuid: string) => [...CHAT_HISTORY_QUERY_KEYS.all, uuid]
};
