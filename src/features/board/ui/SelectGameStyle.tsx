"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { GAME_STYLE } from "@/shared/constants";
import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from "@/shared/ui/popover";

import type { PostForm } from "@/features/board";

export function SelectGameStyle() {
  const [isOpen, setIsOpen] = useState(false);

  const { watch, setValue } = useFormContext<PostForm>();
  const gameStyles = watch("gameStyles");

  const toggleGameStyle = (id: number): void => {
    const exists = gameStyles.includes(id);

    if (exists) {
      setValue(
        "gameStyles",
        gameStyles.filter((v) => v !== id),
        { shouldDirty: true, shouldValidate: true }
      );
      return;
    }

    if (gameStyles.length >= 3) {
      return;
    }

    setValue("gameStyles", [...gameStyles, id], { shouldDirty: true, shouldValidate: true });
  };

  return (
    <div className="flex items-center gap-[4px]">
      <div className="flex gap-[4px]">
        {GAME_STYLE.map(({ gameStyleId, gameStyleName }) =>
          gameStyles.includes(gameStyleId) ? (
            <div
              key={gameStyleId}
              className="rounded-full bg-white px-[12px] py-[4px]"
            >
              {gameStyleName}
            </div>
          ) : null
        )}
      </div>

      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger asChild>
          <Button
            className="flex h-[32px] w-[48px] items-center justify-center rounded-full bg-white"
            type="button"
          >
            <Plus className="size-[16px]" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[599px] rounded-[20px] border-none bg-[rgba(0,0,0,0.70)] p-[32px] text-white
backdrop-blur-[7.5px]"
        >
          <PopoverArrow className="fill-[rgba(0,0,0,0.70)] backdrop-blur-[7.5px]" />
          <PopoverHeader>
            <PopoverTitle className="sr-only">게임 스타일 선택</PopoverTitle>

            <div className="space-y-[28px]">
              <div className="flex items-center justify-between">
                <p className="bold-20">게임 스타일 선택 *최대 3개</p>
                <X
                  className="size-[24px]"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              <div className="flex flex-wrap gap-[12px]">
                {GAME_STYLE.map((v) => {
                  return (
                    <Button
                      key={v.gameStyleId}
                      className={cn(
                        "semibold-18 w-fit rounded-full border border-gray-500 px-[20px] py-[6px]",
                        gameStyles.includes(v.gameStyleId) &&
                          "border-violet-600 bg-violet-600 text-white"
                      )}
                      onClick={() => toggleGameStyle(v.gameStyleId)}
                    >
                      {v.gameStyleName}
                    </Button>
                  );
                })}
              </div>
            </div>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  );
}
