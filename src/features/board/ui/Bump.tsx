"use client";

import { ChevronsUp } from "lucide-react";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { toastMessage } from "@/shared/model";
import { Button } from "@/shared/ui/button";

import { useAuthStore } from "@/features/auth";

export function Bump() {
  const setIsOpenLoginRequiredModal = useAuthStore((s) => s.setIsOpenLoginRequiredModal);
  const accessToken = useAuthStore((s) => s.accessToken);

  return (
    <div className="shrink-0">
      <Button
        className="bold-14 flex items-center gap-[4px] hover:-translate-y-2 hover:bg-gray-200"
        onClick={async () => {
          if (!accessToken) {
            setIsOpenLoginRequiredModal(true);
            return;
          }

          const { error } = await clientSideOpenapiClient.POST("/api/v2/posts/my/latest/bump", {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          if (error) {
            toastMessage.error("기다려");
          } else {
            toastMessage.success("ㅇㅋ");
          }
        }}
      >
        <ChevronsUp className="size-[16px] text-violet-600" />{" "}
        <span className="bg-gradient-to-r from-[#5A42EE] to-[#E02FC8] bg-clip-text text-transparent">
          내가 쓴 글 끌어올리기
        </span>
      </Button>
    </div>
  );
}
