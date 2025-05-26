import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'

export enum LandscapeBoard {
  LandscapeBoard1 = 1,
  LandscapeBoard2,
  LandscapeBoard3,
  LandscapeBoard4
}

export const getLandscapeBoard = (nbPlayers: number) => {
  return shuffle(getEnumValues(LandscapeBoard)).slice(0, nbPlayers)
}
