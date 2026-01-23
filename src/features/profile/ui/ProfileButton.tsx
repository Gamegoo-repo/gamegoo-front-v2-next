"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useUserInfo } from "@/entities/user";

import { useAuthStore } from "@/features/auth";

export const modalItems = [
  { label: "내 정보", href: "profile" },
  { label: "내가 작성한 글", href: "post" },
  { label: "내 평가", href: "review" },
  { label: "차단 목록", href: "blocked" },
  { label: "고객센터", href: "service" },
  { label: "로그아웃", href: "" }
] as const;

export function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { clearAuth } = useAuthStore();
  const modalRef = useRef<HTMLElement>(null);
  const { data: userInfo } = useUserInfo();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!modalRef.current) return;

      if (!modalRef.current.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!userInfo) return null;

  return (
    <div className="relative w-40">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {userInfo.gameName}
      </button>

      {isOpen && (
        <nav
          className="absolute z-10 flex flex-col gap-2 border border-black bg-violet-200 p-4"
          ref={modalRef}
        >
          {modalItems.map(({ label, href }) => {
            if (label === "로그아웃") {
              return (
                <button
                  key={label}
                  className="cursor-pointer text-left"
                  onClick={async () => {
                    await fetch(
                      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/logout`,
                      {
                        method: "POST",
                        credentials: "include"
                      }
                    );

                    clearAuth();
                    setIsOpen(false);
                  }}
                >
                  로그아웃
                </button>
              );
            }

            return (
              <Link
                key={label}
                href={`/mypage/${href}`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
