"use client";

import { ChevronsUp } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/ui/button";

import { LoginRequiredModal } from "@/features/auth";
import { useBumpMutation } from "@/features/board/model/hooks/queries/useBumpMutation";

export function Bump() {
  const [isOpen, setIsOpen] = useState(false);
  const bumpPost = useBumpMutation({
    loginRequired: () => setIsOpen(true)
  });

  return (
    <div className="shrink-0">
      <Button
        className="bold-14 flex items-center gap-[4px] hover:-translate-y-2 hover:bg-gray-200"
        onClick={() => bumpPost.mutate()}
      >
        <ChevronsUp className="size-[16px] text-violet-600" />
        <span className="bg-gradient-to-r from-[#5A42EE] to-[#E02FC8] bg-clip-text text-transparent">
          내가 쓴 글 끌어올리기
        </span>
      </Button>

      {isOpen && (
        <div onClick={() => setIsOpen(false)}>
          <LoginRequiredModal routeBack={false} />
        </div>
      )}
    </div>
  );
}
