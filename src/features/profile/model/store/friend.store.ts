import { create } from "zustand";

type FriendStore = {
  onlineFriendsIds: number[];
  setOnlineFriendsIds: (onlineFriendsIds: number[] | ((prev: number[]) => number[])) => void;
};

export const useFriendStore = create<FriendStore>()((set) => ({
  onlineFriendsIds: [],

  setOnlineFriendsIds: (v) =>
    set((state) => ({
      onlineFriendsIds: typeof v === "function" ? v(state.onlineFriendsIds) : v
    }))
}));
