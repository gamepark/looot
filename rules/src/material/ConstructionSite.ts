import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'
import { Building } from './Building'
import { Land } from './LandscapeBoard'
import { Resource } from './Resource'

export enum ConstructionSite {
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

export const getConstructionSiteType = (tile: ConstructionSite): ConstructionSiteTileType => Math.floor(tile / 10)

export const portConstructionSites: ConstructionSite[] = shuffle(
  getEnumValues(ConstructionSite).filter((it) => getConstructionSiteType(it) === ConstructionSiteTileType.Port)
)
export const altarConstructionSites: ConstructionSite[] = shuffle(
  getEnumValues(ConstructionSite).filter((it) => getConstructionSiteType(it) === ConstructionSiteTileType.Altar)
)
export const palaceConstructionSites: ConstructionSite[] = shuffle(
  getEnumValues(ConstructionSite).filter((it) => getConstructionSiteType(it) === ConstructionSiteTileType.Palace)
)

export const constructionSiteRequirements: Record<ConstructionSite, Land[]> = {
  [ConstructionSite.Port1]: [Building.House, Building.House, Resource.Sheep],
  [ConstructionSite.Port2]: [Building.House, Building.House, Resource.Wood],
  [ConstructionSite.Port3]: [Building.Watchtower, Resource.Axe, Resource.Wood],
  [ConstructionSite.Port4]: [Building.House, Resource.Axe, Resource.Gold],
  [ConstructionSite.Port5]: [Building.House, Resource.Wood, Resource.Sheep],
  [ConstructionSite.Altar1]: [Building.House, Building.House, Building.Watchtower, Resource.Axe],
  [ConstructionSite.Altar2]: [Building.House, Building.House, Building.Watchtower, Resource.Wood],
  [ConstructionSite.Altar3]: [Building.House, Building.House, Building.Watchtower, Resource.Sheep],
  [ConstructionSite.Altar4]: [Building.House, Building.Watchtower, Resource.Wood, Resource.Gold],
  [ConstructionSite.Altar5]: [Building.Watchtower, Building.Watchtower, Resource.Axe, Resource.Sheep],
  [ConstructionSite.Altar5]: [Building.Watchtower, Building.Watchtower, Resource.Axe, Resource.Sheep],
  [ConstructionSite.Palace1]: [Building.Watchtower, Building.House, Building.House, Building.Castle, Resource.Gold],
  [ConstructionSite.Palace2]: [Building.Watchtower, Building.Watchtower, Building.House, Building.House, Building.Castle],
  [ConstructionSite.Palace3]: [Building.Watchtower, Building.Watchtower, Building.House, Building.Castle, Resource.Wood],
  [ConstructionSite.Palace4]: [Building.Watchtower, Building.House, Building.Castle, Building.Castle, Resource.Wood],
  [ConstructionSite.Palace5]: [Building.Watchtower, Building.Watchtower, Building.House, Building.Castle, Resource.Sheep]
}
