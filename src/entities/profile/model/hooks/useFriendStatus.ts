"use client";

import { useEffect, useMemo } from "react";
import { Socket } from "socket.io-client";

import { SOCKET_EVENTS } from "@/shared/constants/socketEvents";

import { useFriendStore } from "@/features/profile";

interface BaseAndTimeStamp {
  event: string;
  timestamp: string;
}

interface InitOnlineFriendList extends BaseAndTimeStamp {
  data: {
    onlineFriendMemberIdList: number[];
  };
}

interface FriendStatus extends BaseAndTimeStamp {
  data: {
    memberId: number;
  };
}

export const useFriendStatus = (socket: Socket | null) => {
  const setOnlineFriendsIds = useFriendStore((s) => s.setOnlineFriendsIds);

  const HANDLERS = useMemo(
    () => ({
      [SOCKET_EVENTS.FRIEND.LIST]: (response: InitOnlineFriendList) =>
        setOnlineFriendsIds(response.data.onlineFriendMemberIdList),
      [SOCKET_EVENTS.FRIEND.ONLINE]: (response: FriendStatus) => {
        const memberId = response.data.memberId;

        setOnlineFriendsIds((prev) => [...prev.filter((v) => v !== memberId), memberId]);
      },
      [SOCKET_EVENTS.FRIEND.OFFLINE]: (response: FriendStatus) => {
        const memberId = response.data.memberId;

        setOnlineFriendsIds((prev) => prev.filter((v) => v !== memberId));
      }
    }),
    [socket, setOnlineFriendsIds]
  );

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
