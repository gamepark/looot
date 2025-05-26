import { getEnumValues } from '@gamepark/rules-api'

export enum PlayerColor {
  Blue = 1,
  Red,
  Grey,
  Yellow
}

export const playerColors = getEnumValues(PlayerColor)
