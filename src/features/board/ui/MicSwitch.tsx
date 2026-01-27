"use client";

import { useFormContext } from "react-hook-form";

import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";

import type { PostForm } from "@/features/board";

export function MicSwitch() {
  const { watch, setValue } = useFormContext<PostForm>();
  const mic = watch("mic");

  return (
    <Button
      className={cn(
        "relative h-[42px] w-[70px] rounded-full bg-gray-500 p-[6px]",
        mic === "AVAILABLE" && "bg-violet-400"
      )}
      onClick={() =>
        setValue("mic", mic === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE", {
          shouldDirty: true,
          shouldValidate: true
        })
      }
      type="button"
    >
      <div
        className={cn(
          "absolute left-[6px] size-[30px] rounded-full bg-white transition-transform duration-300",
          mic === "AVAILABLE" && "translate-x-[28px]"
        )}
      />
    </Button>
  );
}
