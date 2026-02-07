import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

type SocketContextProps = {
  socket: Socket | null;
  isConnected: boolean;
};

export const SocketContext = createContext<SocketContextProps | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocketContext는 SocketProvider와 함께 사용되어야 합니다.");
  }

  return context;
};
