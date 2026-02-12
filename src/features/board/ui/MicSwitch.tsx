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
        "relative h-11 w-18 rounded-full bg-gray-500 p-2 hover:bg-gray-500",
        mic === "AVAILABLE" && "bg-violet-400 hover:bg-violet-400"
      )}
      variant="ghost"
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
          "absolute left-2 size-8 rounded-full bg-white transition-transform duration-300",
          mic === "AVAILABLE" && "translate-x-6"
        )}
      />
    </Button>
  );
}
