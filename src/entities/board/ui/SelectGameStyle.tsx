"use client";

import { X } from "lucide-react";

import { GAME_STYLE } from "@/shared/constants/gameStyle";
import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";

type GameStyleProps = {
  value: number[];
  onChange: (next: number[]) => void;
  onClose: () => void;
};

export function SelectGameStyle({ value, onChange, onClose }: GameStyleProps) {
  return (
    <div className="space-y-[28px]">
      <div className="flex justify-between">
        <p className="bold-20">게임 스타일 선택 *최대 3개</p>
        <X
          className="size-[24px]"
          onClick={onClose}
        />
      </div>

      <div className="flex flex-wrap gap-[12px]">
        {GAME_STYLE.map((v) => {
          const selected = value.includes(v.gameStyleId);

          return (
            <Button
              key={v.gameStyleId}
              className={cn(
                "semibold-18 rounded-full border border-gray-500 px-[20px] py-[6px] text-gray-300",
                selected && "bg-violet-600 text-white"
              )}
              type="button"
              onClick={() => {
                if (selected) {
                  onChange(value.filter((id) => id !== v.gameStyleId));
                  return;
                }

                if (value.length >= 3) return;

                onChange([...value, v.gameStyleId]);
              }}
            >
              {v.gameStyleName}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
