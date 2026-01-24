import { GameMode, Mike, Position, Tier } from "../post.type"

export type RequestPostLists ={
    page: number, gameMode?: GameMode, tier?: Tier, mainP?: Position, subP?: Position, mike?: Mike
}