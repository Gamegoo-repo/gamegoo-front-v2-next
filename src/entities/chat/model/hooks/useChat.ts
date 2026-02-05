import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { SOCKET_EVENTS } from "@/shared/constants/socketEvents";

import { MessageEmitByServer } from "@/entities/chat";

type Err = {
  event: string;
  data: string;
  timestamp: string;
};

export const useChat = (socket: Socket | null, chatroomUuid: string) => {
  const [messages, setMessages] = useState<MessageEmitByServer["data"][]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const HANDLERS = {
    [SOCKET_EVENTS.CONNECT]: () => setIsConnected(true),
    [SOCKET_EVENTS.DISCONNECT]: () => setIsConnected(false),
    [SOCKET_EVENTS.CHAT.MESSAGE]: (response: MessageEmitByServer) =>
      setMessages((prev) => [...prev, response.data]),
    [SOCKET_EVENTS.CHAT.SUCCESS]: (response: MessageEmitByServer) =>
      setMessages((prev) => [...prev, response.data]),
    [SOCKET_EVENTS.ERROR]: (error: Err) => console.error(error)
  };

  useEffect(() => {
    if (!socket) return;

    Object.entries(HANDLERS).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(HANDLERS).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, chatroomUuid]);

  const sendMessage = (message: string) => {
    if (!socket) {
      console.error("소켓이 연결되지 않았습니다.");
      return;
    }

    socket.emit("chat-message", {
      uuid: chatroomUuid,
      message
    });
  };

  return { isConnected, messages, sendMessage };
};
