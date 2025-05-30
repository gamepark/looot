import { getEnumValues } from '@gamepark/rules-api'

export enum TrophyTile {
  Trophy2 = 1,
  Trophy3,
  Trophy4,
  Trophy5,
  Trophy6
}

export const trophies: TrophyTile[] = getEnumValues(TrophyTile)

export const trophyValue = {
  [TrophyTile.Trophy2]: 3,
  [TrophyTile.Trophy3]: 6,
  [TrophyTile.Trophy4]: 10,
  [TrophyTile.Trophy5]: 15,
  [TrophyTile.Trophy6]: 21
}
