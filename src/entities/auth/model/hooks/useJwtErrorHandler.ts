import { useEffect } from "react";
import { Socket } from "socket.io-client";

import { SOCKET_EVENTS } from "@/shared/constants/socketEvents";

type JwtExpiredError = {
  event: string;
  data: {
    eventName: string;
    // eslint-disable-next-line
    eventData: any;
  };
};

export const useJwtErrorHandler = (socket: Socket | null) => {
  const refreshAccessToken = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh`, {
      method: "POST"
    });

    if (!res.ok) throw new Error("토큰 갱신 실패");

    const data = await res.json();

    return data.accessToken;
  };

  const HANDLERS = {
    [SOCKET_EVENTS.JWT_ERROR.CONNECTION]: async () => {
      try {
        const accessToken = await refreshAccessToken();

        if (accessToken) {
          socket?.emit(SOCKET_EVENTS.JWT_UPDATE, { token: accessToken });
        }
      } catch (error) {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/logout`);
      }
    },
    [SOCKET_EVENTS.JWT_ERROR.EXPIRED]: async (response: JwtExpiredError) => {
      const accessToken = await refreshAccessToken();
      const { eventName, eventData } = response.data;

      if (accessToken)
        socket?.emit(eventName, {
          ...eventData,
          token: accessToken
        });
    }
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
  }, [socket]);
};
