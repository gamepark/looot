import { Location } from '@gamepark/rules-api'

export const locationsEquals = (loc1: Location, loc2: Location): boolean => {
  return loc1.x === loc2.x && loc1.y === loc2.y
}
