"use client";

import { useFormContext } from "react-hook-form";

import type { PostForm } from "@/features/board";

export function Comment() {
  const { register, watch } = useFormContext<PostForm>();

  const comment = watch("comment") ?? "";

  return (
    <div className="space-y-[6px]">
      <textarea
        maxLength={80}
        {...register("comment", {
          required: true,
          maxLength: 80
        })}
        className="w-full resize-none rounded-[10px] border-[1px] border-gray-400 px-[10px] py-[8px]
outline-none"
      />

      <div className="flex justify-between">
        <p className="medium-11 text-gray-500">{comment.length} / 80</p>
      </div>
    </div>
  );
}
