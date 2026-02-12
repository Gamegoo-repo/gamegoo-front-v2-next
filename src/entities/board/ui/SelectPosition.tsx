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
            className="size-10"
            type="button"
            variant="ghost"
          >
            <PositionIcon className="w-10" />
          </Button>
        ) : (
          <div className="flex size-10 items-center">
            <Button
              className="flex items-center justify-center rounded-full border border-gray-300
bg-violet-100 px-4 py-1.5 hover:bg-violet-200"
              variant="ghost"
              type="button"
            >
              <Plus className="size-4" />
            </Button>
          </div>
        )}
      </PopoverTrigger>

      <PopoverContent
        className="w-sm rounded-2xl border-none bg-gray-800/85 p-8 text-white backdrop-blur-xs"
      >
        <PopoverArrow className="fill-gray-800/85" />

        <PopoverHeader className="space-y-[28px]">
          <PopoverTitle className="sr-only">{label}</PopoverTitle>

          <div className="flex items-center justify-between pl-2 text-gray-300">
            <p className="bold-20">{label} 선택</p>
            <Button
              className="hover:bg-gray-700"
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            >
              <X className="size-5 cursor-pointer" />
            </Button>
          </div>

          <div className="flex gap-4">
            {Object.keys(POSITION_ICONS).map((v) => {
              const Icon = POSITION_ICONS[v as keyof typeof POSITION_ICONS];

              return (
                <Button
                  key={v}
                  className={cn(
                    "flex size-10 items-center justify-center hover:bg-gray-700",
                    selectedPosition === v && "rounded-[6px] bg-violet-600 [&>svg]:text-white"
                  )}
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    setValue(position, v as keyof typeof POSITION_ICONS, {
                      shouldDirty: true,
                      shouldValidate: true
                    });

                    setIsOpen(false);
                  }}
                >
                  <Icon className="size-7 text-gray-500" />
                </Button>
              );
            })}
          </div>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
