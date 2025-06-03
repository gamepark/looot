import { getEnumValues } from '@gamepark/rules-api'

export enum Resource {
  Wood = 1,
  Sheep,
  Gold,
  Axe
}

export const resources = getEnumValues(Resource)
