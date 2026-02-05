"use client";

import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

import { SOCKET_EVENTS } from "@/shared/constants/socketEvents";

type Err = {
  event: string;
  data: string;
  timestamp: string;
};

export const useSocket = (accessToken: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const HANDLERS = {
    [SOCKET_EVENTS.CONNECT]: () => setIsConnected(true),
    [SOCKET_EVENTS.DISCONNECT]: () => setIsConnected(false),
    [SOCKET_EVENTS.ERROR]: (error: Err) => console.error(error)
  };

  useEffect(() => {
    if (!accessToken) return;

    const socket = io("https://socket.gamegoo.co.kr", {
      auth: { token: accessToken }
    });

    socketRef.current = socket;

    Object.entries(HANDLERS).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(HANDLERS).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [accessToken]);

  return {
    // eslint-disable-next-line
    socket: socketRef.current,
    isConnected
  };
};
