"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, SVGProps, useEffect } from "react";

import { characters } from "@/shared/model";

import { UserInfo } from "@/entities/auth";

import { BoardData } from "@/features/board";

type ModalContainerProps = {
  children: React.ReactNode;
  userInfo: UserInfo | BoardData;
};

export function ModalContainer({ children, userInfo }: ModalContainerProps) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const detectPressEnter = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };

    window.addEventListener("keydown", detectPressEnter);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", detectPressEnter);
    };
  }, [router]);

  if (!userInfo) return null;

  let ProfileIcon: FC<SVGProps<SVGElement>> | null = null;

  if ("profileImage" in userInfo) ProfileIcon = characters[userInfo.profileImage - 1];
  if ("profileImg" in userInfo) ProfileIcon = characters[userInfo.profileImg - 1];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50"
      onClick={() => router.back()}
    >
      <div
        className="relative flex w-[555px] items-center justify-center rounded-[20px] bg-gray-100
p-[32px] pt-[48px]"
        onClick={(e) => e.stopPropagation()}
      >
        <X
          className="absolute top-[17px] right-[14px] size-[24px]"
          onClick={() => router.back()}
        />

        <div className="w-full">
          <header className="flex items-center gap-[12px]">
            <div className="size-[74px] rounded-full bg-violet-300 p-2">
              {ProfileIcon ? <ProfileIcon /> : null}
            </div>

            <div>
              <p className="bold-20">{userInfo.gameName}</p>
              <p className="semibold-14 text-gray-500">#{userInfo.tag}</p>
            </div>
          </header>

          {children}
        </div>
      </div>
    </div>
  );
}
