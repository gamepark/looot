import { getEnumValues } from '@gamepark/rules-api'

export enum ResourceTile {
  Axe = 1,
  Wood,
  Sheep,
  Gold
}

export const resources: ResourceTile[] = getEnumValues(ResourceTile)
