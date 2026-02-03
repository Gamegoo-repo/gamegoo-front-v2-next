import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

type Message = {
  chatroomUuid: string;
  senderId: string;
  senderName: string;
  senderProfileImg: string;
  messages: string;
  createdAt: string;
  timestamp: number;
};

export const useChat = (accessToken: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: {
        token: accessToken
      }
    });

    socketRef.current = socket;

    // 연결 성공
    socket.on("connect", () => {
      console.log("소켓 연결 성공: ", socket.id);
      setIsConnected(true);
    });

    // 연결 실패
    socket.on("connect_error", (error) => {
      console.error("소켓 연결 실패: ", error);
      setIsConnected(false);
    });

    // 메시지 수신
    socket.on("chat-message", (response) => {
      console.log("메시지 수신: ", response);
      setMessages((prev) => [...prev, response.data]);
    });

    // 메시지 발신 성공
    socket.on("my-message-broadcast-success", (response) => {
      console.log("발신 성공: ", response);
      setMessages((prev) => [...prev, response.data]);
    });

    // 에러
    socket.on("error", (error) => {
      console.error("소켓 에러: ", error);
    });

    // 연결 종료
    socket.on("disconnect", () => {
      console.log("소켓 연결 종료");
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [accessToken]);

  const sendMessage = (chatroomUuid: string, message: string) => {
    if (!socketRef.current) {
      console.error("소켓이 연결되지 않았습니다.");
      return;
    }

    socketRef.current.emit("chat-message", {
      uuid: chatroomUuid,
      message
    });
  };

  return { isConnected, messages, sendMessage };
};
