import { getEnumValues } from '@gamepark/rules-api'

export enum Shield {
  PlayAgain = 1,
  DoubleGain,
  PlaceOnOccupiedSpace
}

export const getShieldType = (id: number) => (id % 10) as Shield

export const shields = getEnumValues(Shield)
