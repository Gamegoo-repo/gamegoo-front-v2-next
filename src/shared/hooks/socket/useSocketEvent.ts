import { useEffect, useState } from "react";

import { useSocketContext } from "@/shared/libs/socket/SocketContext";

export function useSocketEvent<T>(eventName: string) {
  const { socket } = useSocketContext();
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!socket) return;

    const handler = (newData: T) => {
      setData(newData);
    };

    socket.on(eventName, handler);

    return () => {
      socket.off(eventName, handler);
    };
  }, [socket, eventName]);

  return data;
}
