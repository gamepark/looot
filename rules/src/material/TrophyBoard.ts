import { Resource } from './Resource'

export enum TrophyBoard {
  TrophyBoard1 = 1,
  TrophyBoard2
}

const T = 10 // Trophy space
const W = Resource.Wood
const G = Resource.Gold
const _ = null

export const trophyBoards: Record<TrophyBoard, (Resource | typeof T | typeof _)[][]> = {
  [TrophyBoard.TrophyBoard1]: [
    [T, T, T, T, T],
    [_, G, _, W, _]
  ],
  [TrophyBoard.TrophyBoard2]: [
    [T, T, T, T, T],
    [_, W, _, G, _]
  ]
}
