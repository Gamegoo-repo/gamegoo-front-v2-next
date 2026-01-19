"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// FIX: 쿠키로 대체
// FIX: 모달 띄웠을 때 / 페이지로 돌아가는 것 방지

export function LoginRequiredModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const loginRequired = searchParams.get("login-required");

  useEffect(() => {
    if (loginRequired !== "true") return;
    router.replace("/");

    if (loginRequired) {
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
    return;
  }, [searchParams]);

  return (
    <>
      {isOpen && (
        <div
          className="absolute top-0 left-0 h-dvh w-dvw bg-gray-800/50"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col gap-10
bg-violet-100 p-4 text-4xl font-bold"
          >
            <span>로그인하삼</span>
            <button
              className="bg-violet-300"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}
