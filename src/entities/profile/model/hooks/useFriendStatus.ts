"use client";

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { SOCKET_EVENTS } from "@/shared/constants/socketEvents";

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
  const [onlineFriendsIds, setOnlineFriendsIds] = useState<number[]>([]);

  const HANDLERS = {
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

  const isFriendOnline = (memberId: number) => onlineFriendsIds.includes(memberId);

  return {
    onlineFriendsIds,
    isFriendOnline
  };
};
