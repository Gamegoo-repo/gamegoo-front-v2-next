import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { StartChat } from "@/entities/chat";

type ChatStatus = "ACTIVE" | "INACTIVE";

type ChatStore = {
  status: ChatStatus;
  uuid: string;
  data: StartChat | null;

  setStatus: (status: ChatStatus) => void;
  setUuid: (uuid: string) => void;
  setData: (data: StartChat) => void;
};

export const useChatStore = create<ChatStore>()(
  devtools((set) => ({
    status: "INACTIVE",
    uuid: "",
    data: null,

    setStatus: (status) => set({ status }),
    setUuid: (uuid) => set({ uuid }),
    setData: (data) => set({ data })
  }))
);
