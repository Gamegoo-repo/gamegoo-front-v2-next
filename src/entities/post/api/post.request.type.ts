import { GameMode, Mike, Position, Tier } from "../model/types/post.type"

export type RequestPostLists ={
    page: number, gameMode?: GameMode, tier?: Tier, mainP?: Position, subP?: Position, mike?: Mike
}