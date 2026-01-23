import { GameMode, Mike, Position, Tier } from "../filters/filters";


export type GameMode = typeof GameMode[keyof typeof GameMode];

export type Tier = typeof Tier[keyof typeof Tier]

export type Position = typeof Position[keyof typeof Position];

export type Mike = typeof Mike[keyof typeof Mike];