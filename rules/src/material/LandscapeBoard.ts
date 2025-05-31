import { Building } from './Building'
import { Resource } from './Resource'

export enum LandscapeBoard {
  LandscapeBoard1 = 1,
  LandscapeBoard2,
  LandscapeBoard3,
  LandscapeBoard4,
  LandscapeBoard5,
  LandscapeBoard6,
  LandscapeBoard7,
  LandscapeBoard8
}

export const X = Resource.Axe
export const G = Resource.Gold
export const S = Resource.Sheep
export const W = Resource.Wood
export const T = Building.Watchtower
export const H = Building.House
export const C = Building.Castle
export const _ = undefined

export type Land = Resource | Building

export const isResource = (land: Land): land is Resource => land < Building.House
export const isBuilding = (land: Land): land is Building => land >= Building.House

export const landscapeBoards: Record<LandscapeBoard, (Land | typeof _)[][]> = {
  [LandscapeBoard.LandscapeBoard1]: [
    [_, _, W, G, S, _, _],
    [_, _, X, T, G, _, _],
    [_, S, G, W, X, W, _],
    [X, H, T, X, C, H, W],
    [W, S, S, X, X, W, S]
  ],
  [LandscapeBoard.LandscapeBoard2]: [
    [_, _, G, W, X, _, _],
    [_, _, W, T, S, _, _],
    [_, S, X, X, S, H, _],
    [X, W, T, W, C, X, S],
    [S, G, W, X, H, W, G]
  ],
  [LandscapeBoard.LandscapeBoard3]: [
    [_, _, G, S, W, _, _],
    [_, _, W, T, W, _, _],
    [_, X, C, X, X, S, _],
    [S, X, X, W, T, H, W],
    [H, S, W, G, S, X, G]
  ],
  [LandscapeBoard.LandscapeBoard4]: [
    [_, _, W, X, S, _, _],
    [_, _, S, T, W, _, _],
    [_, W, C, G, X, H, _],
    [S, X, W, X, T, X, H],
    [G, W, X, S, G, W, S]
  ],
  [LandscapeBoard.LandscapeBoard5]: [
    [_, _, S, W, G, _, _],
    [_, _, W, T, X, _, _],
    [_, S, C, X, X, S, _],
    [W, H, X, W, T, G, H],
    [G, X, S, W, S, W, X]
  ],
  [LandscapeBoard.LandscapeBoard6]: [
    [_, _, G, X, S, _, _],
    [_, _, W, T, W, _, _],
    [_, X, W, W, X, S, _],
    [H, X, C, G, T, W, S],
    [X, W, S, H, X, S, G]
  ],
  [LandscapeBoard.LandscapeBoard7]: [
    [_, _, W, S, G, _, _],
    [_, _, S, T, G, _, _],
    [_, G, X, X, S, H, _],
    [W, W, T, W, X, X, S],
    [S, H, X, W, X, H, W]
  ],
  [LandscapeBoard.LandscapeBoard8]: [
    [_, _, X, G, S, _, _],
    [_, _, S, T, W, _, _],
    [_, H, W, X, S, G, _],
    [X, X, W, X, T, W, H],
    [W, H, S, S, W, G, X]
  ]
}
