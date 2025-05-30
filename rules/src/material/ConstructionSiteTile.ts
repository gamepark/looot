import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'
import { Building } from './Building'
import { Resource } from './Resource'

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

export const getConstructionSiteNeededTiles = (id: number) => {
  const constructionSiteResources = {
    [ConstructionSiteTile.Port1]: [Building.House, Building.House, Resource.Sheep],
    [ConstructionSiteTile.Port2]: [Building.House, Building.House, Resource.Wood],
    [ConstructionSiteTile.Port3]: [Building.Watchtower, Resource.Axe, Resource.Wood],
    [ConstructionSiteTile.Port4]: [Building.House, Resource.Axe, Resource.Gold],
    [ConstructionSiteTile.Port5]: [Building.House, Resource.Wood, Resource.Sheep],
    [ConstructionSiteTile.Altar1]: [Building.House, Building.House, Building.Watchtower, Resource.Axe],
    [ConstructionSiteTile.Altar2]: [Building.House, Building.House, Building.Watchtower, Resource.Wood],
    [ConstructionSiteTile.Altar3]: [Building.House, Building.House, Building.Watchtower, Resource.Sheep],
    [ConstructionSiteTile.Altar4]: [Building.House, Building.Watchtower, Resource.Wood, Resource.Gold],
    [ConstructionSiteTile.Altar5]: [Building.Watchtower, Building.Watchtower, Resource.Axe, Resource.Sheep],
    [ConstructionSiteTile.Altar5]: [Building.Watchtower, Building.Watchtower, Resource.Axe, Resource.Sheep],
    [ConstructionSiteTile.Palace1]: [Building.Watchtower, Building.House, Building.House, Building.Castle, Resource.Gold],
    [ConstructionSiteTile.Palace2]: [Building.Watchtower, Building.Watchtower, Building.House, Building.House, Building.Castle],
    [ConstructionSiteTile.Palace3]: [Building.Watchtower, Building.Watchtower, Building.House, Building.Castle, Resource.Wood],
    [ConstructionSiteTile.Palace4]: [Building.Watchtower, Building.House, Building.Castle, Building.Castle, Resource.Wood],
    [ConstructionSiteTile.Palace5]: [Building.Watchtower, Building.Watchtower, Building.House, Building.Castle, Resource.Wood]
  }
  return constructionSiteResources[id as ConstructionSiteTile]
}
