"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/features/auth/model/store/auth.store";

export function LoginRequiredModal({ routeBack }: { routeBack: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const authStatus = useAuthStore((s) => s.authStatus);

  useEffect(() => {
    if (authStatus !== "authenticated") setIsOpen(true);
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 h-dvh w-dvw bg-gray-800/50"
          onClick={() => {
            if (routeBack) {
              router.back();
              return;
            }

            setIsOpen(false);
          }}
        >
          <div
            className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col gap-10
bg-violet-100 p-4 text-4xl font-bold"
            onClick={(e) => e.stopPropagation()}
          >
            <span>로그인 ㄱㄱ</span>
            <button
              className="bg-violet-300"
              onClick={() => {
                if (routeBack) {
                  router.back();
                  return;
                }

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
