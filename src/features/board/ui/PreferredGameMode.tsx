"use client";

import { useFormContext } from "react-hook-form";

import { GAME_MODE } from "@/shared/constants";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/shared/ui/dropdown";

import type { GameMode, PostForm } from "@/features/board";

export function PreferredGameMode() {
  const { watch, setValue } = useFormContext<PostForm>();
  const gameMode = watch("gameMode");

  const preferredGameMode = (gameMode: string) => {
    switch (gameMode) {
      case "SOLO":
        return "솔로랭크";
      case "FREE":
        return "자유랭크";
      case "FAST":
        return "빠른 대전";
      case "ARAM":
        return "칼바람 나락";
    }
  };

  return (
    <Select
      value={gameMode}
      onValueChange={(v) =>
        setValue("gameMode", v as GameMode, { shouldDirty: true, shouldValidate: true })
      }
    >
      <SelectTrigger
        className="medium-16 h-[56px]! w-[242px] rounded-[10px] border-gray-300 bg-white px-[20px]
py-[16px] [&>svg]:size-[24px] [&>svg]:text-gray-600"
      >
        {preferredGameMode(gameMode)}
      </SelectTrigger>

      <SelectContent
        className="rounded-[10px] border-gray-300 bg-white [&_[data-radix-select-viewport]]:p-0"
        position="popper"
      >
        {GAME_MODE.slice(1, GAME_MODE.length).map(({ label, value }) => (
          <SelectItem
            key={value}
            className="medium-16 h-[56px] px-[20px] py-[16px] hover:bg-gray-100
hover:text-violet-600 [&_svg]:hidden"
            value={value}
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
