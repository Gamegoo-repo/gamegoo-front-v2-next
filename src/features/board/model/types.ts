import { paths } from "@/shared/api/schema";

export type BoardData =
  paths["/api/v2/posts/list/{boardId}"]["get"]["responses"]["200"]["content"]["*/*"]["data"];
export type BoardList =
  paths["/api/v2/posts/list"]["get"]["responses"]["200"]["content"]["*/*"]["data"];

export type MainPosition = NonNullable<BoardData>["mainP"];
export type SubPosition = NonNullable<BoardData>["subP"];
export type GameMode = NonNullable<BoardData>["gameMode"];
export type Mic = NonNullable<BoardData>["mike"];
export type Tier = NonNullable<BoardData>["soloTier"];
export type Position = NonNullable<BoardData>["mainP"];

export type PostForm = {
  mainPosition: MainPosition | undefined;
  subPosition: SubPosition | undefined;
  wantMainPosition: MainPosition | undefined;
  wantSubPosition: SubPosition | undefined;
  gameMode: GameMode;
  gameStyles: number[];
  mic: Mic;
  comment: string;
};

export type PostBody = {
  gameMode: GameMode;
  mainP: MainPosition;
  subP: SubPosition;
  wantP: MainPosition[];
  mike?: Mic | undefined;
  gameStyles?: number[] | undefined;
  contents?: string | undefined;
};
