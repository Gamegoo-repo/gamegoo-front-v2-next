import { POSITION_ICONS, TIER_ICONS } from "@/shared/constants";

import {
  Comments,
  GameStyle,
  MainOrSubPosition,
  PreferredGameMode,
  Rank,
  RecentPreferredChampions,
  WantPosition,
  WinRate
} from "@/entities/board";

import { BoardData, ModalContainer } from "@/features/board";

// FIX: generateMetadata 적용

export async function BoardId({ boardData }: { boardData: BoardData }) {
  if (!boardData) return null;

  const SoloTierIcon = TIER_ICONS[boardData.soloTier as keyof typeof TIER_ICONS];
  const FreeTierIcon = TIER_ICONS[boardData.freeTier as keyof typeof TIER_ICONS];
  const MainPositionIcon = POSITION_ICONS[boardData.mainP as keyof typeof POSITION_ICONS];
  const SubPositionIcon = POSITION_ICONS[boardData.subP as keyof typeof POSITION_ICONS];
  const FirstWantPositionIcon = POSITION_ICONS[boardData.wantP[0] as keyof typeof POSITION_ICONS];
  const SecondWantPositionIcon = POSITION_ICONS[boardData.wantP[1] as keyof typeof POSITION_ICONS];

  const d = new Date(boardData.createdAt);
  const result =
    [
      String(d.getFullYear()).slice(2),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0")
    ].join(".") +
    ` ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

  return (
    <ModalContainer userInfo={boardData}>
      <div className="mt-[30px] space-y-[6px]">
        <main className="space-y-[30px]">
          {/* 랭크 */}
          <div className="flex items-center gap-32">
            <Rank
              Icon={SoloTierIcon}
              tier={boardData.soloTier}
              rank={boardData.soloRank}
              gameType="솔로랭크"
            />
            <Rank
              Icon={FreeTierIcon}
              tier={boardData.freeTier}
              rank={boardData.freeRank}
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
              <PreferredGameMode gameMode={boardData.gameMode} />
            </div>

            <div className="space-y-[6px]">
              <h2 className="semibold-14 flex justify-between">최근 선호 챔피언</h2>
              <RecentPreferredChampions
                championStatsResponseList={boardData.championStatsResponseList}
              />
            </div>
          </div>

          {/* 승률 */}
          <div className="space-y-[6px]">
            <h2 className="semibold-14">승률 {boardData.winRate}%</h2>
            <WinRate winRate={boardData.winRate ?? 0} />
          </div>

          {/* 게임 스타일 */}
          <div className="space-y-[6px]">
            <h2 className="semibold-14">게임 스타일</h2>
            <GameStyle gameStyles={boardData.gameStyles} />
          </div>

          {/* 한마디 */}
          <div className="space-y-[6px]">
            <h2 className="semibold-14">한마디</h2>
            <Comments comments={boardData.contents ?? ""} />
          </div>
        </main>

        {/* 게시일 */}
        <p className="medium-11 text-right text-gray-500">게시일: {result}</p>
      </div>
    </ModalContainer>
  );
}
