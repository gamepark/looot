import { Location, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { getConstructionSiteNeededTiles } from '../../material/ConstructionSiteTile'
import { LocationType } from '../../material/LocationType'
import { getLongshipNeededTiles } from '../../material/Longship'
import { MaterialType } from '../../material/MaterialType'

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
    return places.filter(isRealCaseInBoard).filter((it) => this.placeIsNotOccuped(it))
  }

  checkConstructionSite(): MaterialMove[] {
    return this.checkResources(MaterialType.ConstructionSiteTile, getConstructionSiteNeededTiles)
  }

  checkLongship(): MaterialMove[] {
    return this.checkResources(MaterialType.LongshipTile, getLongshipNeededTiles)
  }

  private checkResources(tileType: MaterialType, getNeededTiles: (id: number) => number[]): MaterialMove[] {
    return this.material(tileType)
      .location(LocationType.FjordBoardHexSpace)
      .location(loc => !loc.rotation)
      .player(this.player)
      .filter((it) => {
        const tilesNeeded = getNeededTiles(it.id as number)
        const resourcesAround = this.getNeighborsId(it.location, MaterialType.ResourceTile)
        const buildingsAround = this.getNeighborsId(it.location, MaterialType.BuildingTile)
        const tilesAround = [...resourcesAround, ...buildingsAround].filter((it) => it !== undefined)
        return checkIfAllNeededTilesIsAround(tilesNeeded, tilesAround)
      })
      .moveItems((item) => ({ ...item.location, rotation: true }))
  }

  private placeIsNotOccuped(location: Location) {
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

  private getNeighborsId(location: Location, materialType: MaterialType) {
    return getNeighbors(location).map(
      (it) =>
        this.material(materialType)
          .location(LocationType.FjordBoardHexSpace)
          .location((loc) => loc.x === it.x && loc.y === it.y)
          .player(this.player)
          .getItem()?.id
    )
  }
}

const getNeighbors = (location: Location) => {
  const x: number = location.x ?? 0
  const y: number = location.y ?? 0
  const neighbors =
    x % 2 !== 0
      ? [
          { x: x + 1, y },
          { x: x + 1, y: y - 1 },
          { x, y: y - 1 },
          { x: x - 1, y: y - 1 },
          { x: x - 1, y },
          { x, y: y + 1 }
        ]
      : [
          { x: x + 1, y: y + 1 },
          { x: x + 1, y },
          { x, y: y - 1 },
          { x: x - 1, y },
          { x: x - 1, y: y + 1 },
          { x, y: y + 1 }
        ]

  return neighbors.filter((it) => it.x >= 0 && it.x <= 6).filter((it) => it.y >= 0 && it.y <= 6)
}

const checkIfAllNeededTilesIsAround = (needed: number[], actuals: number[]) => {
  if (actuals.length < needed.length) return false

  const res = []
  for (let i = 0; i < needed.length; i++) {
    const index = actuals.findIndex((it) => it === needed[i])
    if (index !== -1) {
      res.push(...actuals.splice(index, 1))
    }
  }

  return res.length === needed.length
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
