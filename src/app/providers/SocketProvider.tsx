"use client";

import { useSocket } from "@/shared/api/socket/useSocket";
import { SocketContext } from "@/shared/libs/socket/SocketContext";

import { useJwtErrorHandler } from "@/entities/auth";

import { useAuthStore } from "@/features/auth";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const accessToken = useAuthStore((s) => s.accessToken);

  const { socket, isConnected } = useSocket(accessToken!);
  useJwtErrorHandler(socket);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
  );
}
