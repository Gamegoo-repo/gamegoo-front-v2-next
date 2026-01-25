"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { POSITION_ICONS } from "@/shared/constants";
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

type SelectPositionProps = {
  label: string;
  position: "mainPosition" | "subPosition" | "wantMainPosition" | "wantSubPosition";
};

export function SelectPosition({ label, position }: SelectPositionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { setValue, watch } = useFormContext<PostForm>();
  const selectedPosition = watch(position);

  const PositionIcon = selectedPosition ? POSITION_ICONS[selectedPosition] : undefined;

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>
        {PositionIcon ? (
          <Button
            className="size-[48px]"
            type="button"
          >
            <PositionIcon className="w-[48px]" />
          </Button>
        ) : (
          <div className="flex size-[48px] items-center">
            <Button
              className="flex h-[32px] w-[48px] items-center justify-center rounded-full
bg-violet-100"
              type="button"
            >
              <Plus className="size-[16px]" />
            </Button>
          </div>
        )}
      </PopoverTrigger>

      <PopoverContent
        className="w-[388px] rounded-[20px] border-none bg-[rgba(0,0,0,0.70)] p-[32px] text-white
backdrop-blur-[7.5px]"
      >
        <PopoverArrow className="fill-[rgba(0,0,0,0.70)]" />

        <PopoverHeader className="space-y-[28px]">
          <PopoverTitle className="sr-only">{label}</PopoverTitle>

          <div className="flex justify-between">
            <p className="bold-20">{label} 선택</p>
            <X
              className="size-[24px] cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="flex gap-[20px]">
            {Object.keys(POSITION_ICONS).map((v) => {
              const Icon = POSITION_ICONS[v as keyof typeof POSITION_ICONS];

              return (
                <Button
                  key={v}
                  className={cn(
                    "flex size-[38px] items-center justify-center hover:bg-gray-800",
                    selectedPosition === v && "rounded-[6px] bg-violet-600 [&>svg]:text-white"
                  )}
                  type="button"
                  onClick={() => {
                    setValue(position, v as keyof typeof POSITION_ICONS, {
                      shouldDirty: true,
                      shouldValidate: true
                    });

                    setIsOpen(false);
                  }}
                >
                  <Icon className="size-[28px] text-gray-500" />
                </Button>
              );
            })}
          </div>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
