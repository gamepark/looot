import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'

export enum ConstructionSiteTile {
  Port1 = 10,
  Port2,
  Port3,
  Port4,
  Port5,
  Altar1 = 20,
  Altar2,
  Altar3,
  Altar4,
  Altar5,
  Palace1 = 30,
  Palace2,
  Palace3,
  Palace4,
  Palace5
}
export enum ConstructionSiteTileType {
  Port = 1,
  Altar,
  Palace
}

export const getConstructionSiteType = (tile: ConstructionSiteTile): ConstructionSiteTileType => Math.floor(tile / 10) as ConstructionSiteTileType

export const portConstructionSites: ConstructionSiteTile[] = shuffle(
  getEnumValues(ConstructionSiteTile).filter((it) => getConstructionSiteType(it) === ConstructionSiteTileType.Port)
)
export const altarConstructionSites: ConstructionSiteTile[] = shuffle(
  getEnumValues(ConstructionSiteTile).filter((it) => getConstructionSiteType(it) === ConstructionSiteTileType.Altar)
)
export const palaceConstructionSites: ConstructionSiteTile[] = shuffle(
  getEnumValues(ConstructionSiteTile).filter((it) => getConstructionSiteType(it) === ConstructionSiteTileType.Palace)
)
