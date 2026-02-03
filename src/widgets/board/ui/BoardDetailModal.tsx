"use client";

import { getPositionIcon, getTierIcon } from "@/shared/model/getIcon";

import {
  Comments,
  GameStyle,
  MainOrSubPosition,
  PreferredGameMode,
  Rank,
  RecentPreferredChampions,
  WantPosition,
  WinRate,
  createdAtFormat
} from "@/entities/board";

import { BoardData, ModalContainer } from "@/features/board";
import { usePostDetailQuery } from "@/features/post/model/hooks/queries/usePostDetailQuery";

type BoardDetailModalProps = {
  boardId: string;
  boardData: BoardData;
};

export function BoardDetailModal({ boardId, boardData }: BoardDetailModalProps) {
  const { data } = usePostDetailQuery(boardId, boardData);

  if (!boardData || !data) return null;

  const SoloTierIcon = getTierIcon(data.soloTier);
  const FreeTierIcon = getTierIcon(data.freeTier);
  const MainPositionIcon = getPositionIcon(data.mainP);
  const SubPositionIcon = getPositionIcon(data.subP);
  const FirstWantPositionIcon = getPositionIcon(data.wantP[0]);
  const SecondWantPositionIcon = getPositionIcon(data.wantP[1]);

  return (
    <ModalContainer userInfo={data}>
      <div className="mt-[30px] space-y-[6px]">
        <main className="space-y-[30px]">
          {/* 랭크 */}
          <div className="flex items-center gap-32">
            <Rank
              Icon={SoloTierIcon}
              tier={data.soloTier}
              rank={data.soloRank}
              gameType="솔로랭크"
            />
            <Rank
              Icon={FreeTierIcon}
              tier={data.freeTier}
              rank={data.freeRank}
              gameType="자유랭크"
            />
          </div>

          {/* 포지션 */}
          <div className="space-y-[6px]">
            <h2 className="semibold-14">포지션</h2>
            <div className="bold-12 flex gap-[8px] *:w-1/2 *:rounded-[10px]">
              <MainOrSubPosition
                MainPositionIcon={MainPositionIcon}
                SubPositionIcon={SubPositionIcon}
              />

              <WantPosition
                FirstWantPositionIcon={FirstWantPositionIcon}
                SecondWantPositionIcon={SecondWantPositionIcon}
              />
            </div>
          </div>

          {/* 선호 게임모드 / 챔피언 */}
          <div className="flex gap-[8px] *:w-1/2">
            <div className="space-y-[6px]">
              <h2 className="semibold-14">선호 게임모드</h2>
              <PreferredGameMode gameMode={data.gameMode} />
            </div>

            <div className="space-y-[6px]">
              <h2 className="semibold-14 flex justify-between">최근 선호 챔피언</h2>
              <RecentPreferredChampions
                championStatsResponseList={data.championStatsResponseList}
              />
            </div>
          </div>

          {/* 승률 */}
          <div className="space-y-[6px]">
            <h2 className="semibold-14">승률 {data.winRate}%</h2>
            <WinRate winRate={data.winRate ?? 0} />
          </div>

          {/* 게임 스타일 */}
          <div className="space-y-[6px]">
            <h2 className="semibold-14">게임 스타일</h2>
            <GameStyle gameStyles={data.gameStyles} />
          </div>

          {/* 한마디 */}
          <div className="space-y-[6px]">
            <h2 className="semibold-14">한마디</h2>
            <Comments comments={data.contents ?? ""} />
          </div>
        </main>

        {/* 게시일 */}
        <p className="medium-11 text-right text-gray-500">
          게시일: {createdAtFormat(data.createdAt)}
        </p>
      </div>
    </ModalContainer>
  );
}
