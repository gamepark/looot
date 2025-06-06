import { getAdjacentHexagons, HexGridSystem, Location, MaterialGame, MaterialMove, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { Building } from '../../material/Building'
import { ConstructionSite, constructionSiteRequirements } from '../../material/ConstructionSite'
import { LocationType } from '../../material/LocationType'
import { Longship, longshipRequirements } from '../../material/Longship'
import { MaterialType } from '../../material/MaterialType'
import { Resource } from '../../material/Resource'

export class FjordBoardHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player: number | undefined = game.rule?.player
  ) {
    super(game)
  }

  getPossiblePlaces(): Location[] {
    const places: Location[] = []
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        places.push({ type: LocationType.FjordBoardHexSpace, x: i, y: j, player: this.player })
      }
    }
    return places.filter(isRealCaseInBoard).filter((it) => this.placeIsNotOccupied(it))
  }

  completeConstructionSites(location: XYCoordinates): MaterialMove[] {
    const constructionSiteTiles = this.getTilesAround(MaterialType.ConstructionSiteTile, location).location((location) => !location.rotation)
    return constructionSiteTiles.filter<ConstructionSite>((item) => this.isConstructionSiteComplete(item.id, item.location as XYCoordinates)).rotateItems(true)
  }

  private isConstructionSiteComplete(constructionSite: ConstructionSite, location: XYCoordinates) {
    const adjacentElements = [...this.getAdjacentBuildings(location), ...this.getAdjacentResources(location)].map((item) => item.id)
    return arrayContainsAll(adjacentElements, constructionSiteRequirements[constructionSite])
  }

  getAdjacentBuildings(location: XYCoordinates) {
    return this.getTilesAround(MaterialType.BuildingTile, location).getItems<Building>()
  }

  getAdjacentResources(location: XYCoordinates) {
    return this.getTilesAround(MaterialType.ResourceTile, location).getItems<Resource>()
  }

  completeLongships(location: XYCoordinates): MaterialMove[] {
    const longshipTiles = this.getTilesAround(MaterialType.LongshipTile, location).location((location) => !location.rotation)
    return longshipTiles.filter<Longship>((item) => this.isLongshipComplete(item.id, item.location as XYCoordinates)).rotateItems(true)
  }

  isLongshipComplete(longship: Longship, location: XYCoordinates) {
    const adjacentElements = this.getAdjacentResources(location).map((item) => item.id)
    return arrayContainsAll(adjacentElements, longshipRequirements[longship])
  }

  private getTilesAround(type: MaterialType, location: XYCoordinates) {
    const adjacentHex = getAdjacentHexagons(location, HexGridSystem.EvenQ)
    return this.material(type)
      .location(LocationType.FjordBoardHexSpace)
      .player(this.player)
      .location((location) => adjacentHex.some(({ x, y }) => location.x === x && location.y === y))
  }

  private placeIsNotOccupied(location: Location) {
    return (
      !this.checkIfTileExistInCase(MaterialType.BuildingTile, location) &&
      !this.checkIfTileExistInCase(MaterialType.ResourceTile, location) &&
      !this.checkIfTileExistInCase(MaterialType.LongshipTile, location) &&
      !this.checkIfTileExistInCase(MaterialType.ConstructionSiteTile, location)
    )
  }

  private checkIfTileExistInCase(materialType: MaterialType, location: Location) {
    return (
      this.material(materialType)
        .location((loc) => loc.type === location.type && loc.x === location.x && loc.y === location.y)
        .player(location.player).length > 0
    )
  }
}

function arrayContainsAll<T>(array: T[], required: T[]) {
  for (const n of required) {
    const index = array.indexOf(n)
    if (index === -1) {
      return false
    }
    array.splice(index, 1)
  }
  return true
}

const isRealCaseInBoard = (location: Location) => {
  const forbiddenLocations = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 1 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 0, y: 6 },
    { x: 2, y: 6 },
    { x: 4, y: 6 },
    { x: 5, y: 6 },
    { x: 6, y: 5 },
    { x: 6, y: 6 }
  ]
  return !forbiddenLocations.find((it) => it.x === location.x && it.y === location.y)
}
