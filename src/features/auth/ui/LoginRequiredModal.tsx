"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useAuthStore } from "@/features/auth/model/store/auth.store";

/**
 * 로그인이 필요합니다 모달 컴포넌트
 */
export function LoginRequiredModal({ routeBack = false }) {
  const { isOpenLoginRequiredModal, setIsOpenLoginRequiredModal } = useAuthStore();
  const router = useRouter();

  const handleOnClick = useCallback(() => {
    if (routeBack) router.back();

    setIsOpenLoginRequiredModal(false);
  }, [routeBack, router, setIsOpenLoginRequiredModal]);

  return (
    <>
      {isOpenLoginRequiredModal && (
        <div
          className="fixed inset-0 z-10 h-dvh w-dvw bg-gray-800/50"
          onClick={handleOnClick}
        >
          <div
            className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col gap-10
bg-violet-100 p-4 text-4xl font-bold"
            onClick={(e) => e.stopPropagation()}
          >
            <span>로그인 ㄱㄱ</span>
            <button
              className="bg-violet-300"
              onClick={handleOnClick}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}
