"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { LoginRequiredModal, useAuthStore } from "@/features/auth";

export function Post() {
  const [isOpen, setIsOpen] = useState(false);
  const accessToken = useAuthStore((s) => s.accessToken);
  const searchParams = useSearchParams();

  return (
    <div className="shrink-0">
      <Link
        href={{
          pathname: accessToken ? "/board/post" : "",
          query: { page: searchParams.get("page") }
        }}
        className="bold-14 flex h-[58px] w-[248px] items-center justify-center rounded-[12px]
bg-violet-600 text-white hover:bg-violet-500"
        onClick={() => {
          if (!accessToken) setIsOpen(true);
        }}
        scroll={false}
      >
        글 작성하기
      </Link>

      {isOpen && (
        <div onClick={() => setIsOpen(false)}>
          <LoginRequiredModal routeBack={false} />
        </div>
      )}
    </div>
  );
}
