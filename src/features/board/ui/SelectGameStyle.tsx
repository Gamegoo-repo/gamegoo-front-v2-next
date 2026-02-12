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
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex flex-wrap gap-2">
        <div className="h-[34px]">
          <PopoverTrigger asChild>
            <Button
              className="flex items-center justify-center rounded-full border border-gray-300
bg-white px-4 py-1.5 hover:border-gray-400 hover:bg-gray-300"
              variant="ghost"
              type="button"
              onClick={() => setIsOpen(true)}
            >
              <Plus className="size-4" />
            </Button>
          </PopoverTrigger>
        </div>

        {GAME_STYLE.map(({ gameStyleId, gameStyleName }) =>
          gameStyles.includes(gameStyleId) ? (
            <Button
              key={gameStyleId}
              className="flex h-[34px] shrink-0 items-center gap-1 rounded-full border
border-gray-300 bg-white px-3 py-1"
              variant="ghost"
              onClick={() => toggleGameStyle(gameStyleId)}
            >
              <span>{gameStyleName}</span>
              <X className="size-4" />
            </Button>
          ) : null
        )}

        <PopoverContent
          className="w-xl rounded-2xl border-none bg-gray-800/85 p-8 text-white backdrop-blur-xs"
          side="top"
        >
          <PopoverArrow className="fill-gray-800/85 backdrop-blur-sm" />
          <PopoverHeader>
            <PopoverTitle className="sr-only">게임 스타일 선택</PopoverTitle>

            <div className="space-y-[28px]">
              <div className="flex items-center justify-between pl-2 text-gray-300">
                <p className="bold-20">게임 스타일 선택 *최대 3개</p>

                <Button
                  className="hover:bg-gray-700"
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="size-5 cursor-pointer" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {GAME_STYLE.map((v) => {
                  return (
                    <Button
                      key={v.gameStyleId}
                      className={cn(
                        `w-fit rounded-full border border-gray-500 px-2 py-1 hover:border-gray-400
hover:bg-gray-600 focus-visible:ring-violet-400! focus-visible:ring-offset-2!
focus-visible:ring-offset-gray-800/85`,
                        gameStyles.includes(v.gameStyleId) &&
                          `border-violet-700 bg-violet-600 text-white hover:border-violet-600
hover:bg-violet-500`
                      )}
                      variant="ghost"
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
      </div>
    </Popover>
  );
}
