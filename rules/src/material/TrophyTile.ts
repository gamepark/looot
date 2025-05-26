import { getEnumValues } from '@gamepark/rules-api'

export enum TrophyTile {
  Trophy2 = 1,
  Trophy3,
  Trophy4,
  Trophy5,
  Trophy6
}

export const trophies: TrophyTile[] = getEnumValues(TrophyTile)
