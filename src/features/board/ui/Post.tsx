"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/shared/ui/button";

import { useAuthStore } from "@/features/auth";

export function Post() {
  const setIsOpenLoginRequiredModal = useAuthStore((s) => s.setIsOpenLoginRequiredModal);
  const authStatus = useAuthStore((s) => s.authStatus);
  const searchParams = useSearchParams();

  return (
    <div className="shrink-0">
      <Button
        className="bold-14 h-14 w-60 rounded-xl"
        asChild
      >
        <Link
          href={{
            pathname: authStatus === "authenticated" ? "/board/post" : "",
            query: { page: searchParams.get("page") }
          }}
          onClick={() => {
            if (authStatus !== "authenticated") setIsOpenLoginRequiredModal(true);
          }}
          scroll={false}
        >
          글 작성하기
        </Link>
      </Button>
    </div>
  );
}
