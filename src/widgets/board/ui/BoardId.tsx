import { paths } from "@/shared/api/schema";
import { POSITION_ICONS, TIER_ICONS } from "@/shared/constants";
import { characters } from "@/shared/model";

import {
  Comments,
  GameStyle,
  MainOrSubPosition,
  PreferredGameMode,
  Profile,
  Rank,
  RecentPreferredChampions,
  WantPosition,
  WinRate
} from "@/entities/board";

import { ModalContainer } from "@/widgets/board";

type BoardData =
  paths["/api/v2/posts/list/{boardId}"]["get"]["responses"]["200"]["content"]["*/*"]["data"];

// FIX: generateMetadata 적용

export async function BoardId({ boardData }: { boardData: BoardData }) {
  if (!boardData) return null;

  const ProfileIcon = characters[boardData.profileImage - 1];
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
    <ModalContainer>
      <div className="space-y-4 p-4">
        <header className="flex items-center">
          <Profile
            ProfileIcon={ProfileIcon}
            gameName={boardData.gameName}
            tag={boardData.tag}
          />
        </header>

        <main className="space-y-8">
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
          <div>
            <h2>포지션</h2>
            <div className="flex gap-4">
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
          <div className="flex *:flex-1">
            <div>
              <h2>선호 게임모드</h2>
              <PreferredGameMode gameMode={boardData.gameMode} />
            </div>

            <div>
              <h2 className="flex justify-between">
                <span>최근 선호 챔피언</span>
                <span>최근 30게임 </span>
              </h2>
              <RecentPreferredChampions
                championStatsResponseList={boardData.championStatsResponseList}
              />
            </div>
          </div>

          {/* 승률 */}
          <div>
            <h2>승률 {boardData.winRate}%</h2>
            <WinRate winRate={boardData.winRate ?? 0} />
          </div>

          {/* 게임 스타일 */}
          <div>
            <h2>게임 스타일</h2>
            <GameStyle gameStyles={boardData.gameStyles} />
          </div>

          {/* 한마디 */}
          <div className="space-y-1">
            <h2>한마디</h2>
            <Comments comments={boardData.contents ?? ""} />
          </div>

          {/* 게시일 */}
          <div className="text-right">게시일: {result}</div>
        </main>
      </div>
    </ModalContainer>
  );
}
