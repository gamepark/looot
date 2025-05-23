import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'

export enum MainBoard {
  MainBoard1 = 1,
  MainBoard2,
  MainBoard3,
  MainBoard4
}

export const getMainBoard = (nbPlayers: number) => {
  return shuffle(getEnumValues(MainBoard)).slice(0, nbPlayers)
}
