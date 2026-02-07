"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useAuthStore } from "@/features/auth";

export function Post() {
  const setIsOpenLoginRequiredModal = useAuthStore((s) => s.setIsOpenLoginRequiredModal);
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
          if (!accessToken) setIsOpenLoginRequiredModal(true);
        }}
        scroll={false}
      >
        글 작성하기
      </Link>
    </div>
  );
}
