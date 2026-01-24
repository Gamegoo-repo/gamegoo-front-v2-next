"use client";

import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/shared/libs/cn";
import { useFetchProfileQuery } from "../model/hooks/queries/useFetchProfileQuery";

const GAME_STYLE = [
  { gameStyleId: 1, gameStyleName: "광물 탈출" },
  { gameStyleId: 2, gameStyleName: "랭크 올리고 싶어요" },
  { gameStyleId: 3, gameStyleName: "이기기만 하면 뭔들" },
  { gameStyleId: 4, gameStyleName: "바른말 사용" },
  { gameStyleId: 5, gameStyleName: "답장 빨라요" },
  { gameStyleId: 6, gameStyleName: "마이크 필수" },
  { gameStyleId: 7, gameStyleName: "마이크 안해요" },
  { gameStyleId: 8, gameStyleName: "과도한 핑은 사절이에요" },
  { gameStyleId: 9, gameStyleName: "즐겜러" },
  { gameStyleId: 10, gameStyleName: "빡겜러" },
  { gameStyleId: 11, gameStyleName: "원챔러" },
  { gameStyleId: 12, gameStyleName: "욕하지 말아요" },
  { gameStyleId: 13, gameStyleName: "뚝심있는 탑" },
  { gameStyleId: 14, gameStyleName: "갱킹마스터 정글러" },
  { gameStyleId: 15, gameStyleName: "1인군단 원딜러" },
  { gameStyleId: 16, gameStyleName: "무한 백업 서포터" },
  { gameStyleId: 17, gameStyleName: "칼바람 장인" }
];

// FIX: 기능 구현되지 않음 / Optimistic UI 적용

export function SelectGameStyleButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGameStyleId, setSelectedGameStyleId] = useState<number[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const { data: userInfo } = useFetchProfileQuery();

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
    <div className="relative flex items-center gap-4">
      {userInfo.gameStyleResponseList.length === 0 ? (
        <p>선택한 게임 스타일이 없어요</p>
      ) : (
        <div className="flex gap-4">
          {userInfo.gameStyleResponseList.map(({ gameStyleId, gameStyleName }) => {
            return (
              <p
                key={gameStyleId}
                className="shrink-0 rounded-full border bg-white px-4 py-1"
              >
                {gameStyleName}
              </p>
            );
          })}
        </div>
      )}

      <div ref={modalRef}>
        <div className="relative bg-green-200">
          <button
            className="bg-white px-4 py-1"
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
                return;
              }

              setIsOpen(true);
            }}
          >
            <Plus />
          </button>

          {isOpen && (
            <div
              className="absolute -bottom-76 left-1/2 w-lg -translate-x-1/2 bg-gray-700 text-white"
            >
              <div className="relative p-4">
                <div
                  className="absolute -top-2 left-1/2 -z-10 h-4 w-4 -translate-x-1/2 rotate-45
bg-gray-700 p-4"
                />
                <div className="flex items-center justify-between">
                  <p className="text-xl">게임 스타일 선택 *최대 3개</p>
                  <button onClick={() => setIsOpen(false)}>
                    <X />
                  </button>
                </div>

                <div className="mt-8 flex flex-wrap space-y-2 space-x-2">
                  {GAME_STYLE.map(({ gameStyleId, gameStyleName }) => {
                    const isSelected = userInfo.gameStyleResponseList.some(
                      (v) => v.gameStyleId === gameStyleId
                    );

                    return (
                      <button
                        key={gameStyleId}
                        className={cn(
                          "h-fit rounded-full border border-white px-2 py-0.5",
                          isSelected && "bg-violet-600"
                        )}
                        onClick={() => {
                          setSelectedGameStyleId((prev) => {
                            if (prev.includes(gameStyleId)) {
                              return prev.filter((id) => id !== gameStyleId);
                            }

                            if (prev.length >= 3) return prev;

                            return [...prev, gameStyleId];
                          });
                        }}
                      >
                        {gameStyleName}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
