import { Water } from './LandscapeBoard'
import { Resource } from './Resource'

export enum OceanBoard {
  OceanBoard1 = 1,
  OceanBoard2
}

const W = Water
const X = Resource.Axe
const S = Resource.Sheep
const _ = undefined

export const oceanBoards: Record<OceanBoard, (Resource | typeof W | typeof _)[][]> = {
  [OceanBoard.OceanBoard1]: [
    [W, W, W, W, W],
    [_, X, _, S, _]
  ],
  [OceanBoard.OceanBoard2]: [
    [W, W, W, W, W],
    [_, S, _, X, _]
  ]
}
