import { getEnumValues, HexGridSystem, Location, MaterialGame, MaterialRulesPart, Polyhex } from '@gamepark/rules-api'
import { getLandscape, Land, LandscapeBoard, TrophyPlace, Water } from '../../material/LandscapeBoard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { OceanBoard, oceanBoards } from '../../material/OceanBoard'
import { Resource } from '../../material/Resource'
import { TrophyBoard, trophyBoards } from '../../material/TrophyBoard'
import { getNeighbors } from './utils'

export class LandscapeHelper extends MaterialRulesPart {
  landscape: Polyhex<Land | typeof Water | typeof TrophyPlace>
  overlap = false

  constructor(game: MaterialGame) {
    super(game)
    this.landscape = new Polyhex([], { system: HexGridSystem.EvenQ })
    const landscapeBoardItems = this.material(MaterialType.LandscapeBoard).getItems<LandscapeBoard>()
    for (const item of landscapeBoardItems) {
      this.landscape.merge(getLandscape(item.id), item.location, () => (this.overlap = true))
    }
    const oceanBoardItem = this.material(MaterialType.OceanBoard).getItem<OceanBoard>()
    if (oceanBoardItem) {
      this.landscape.merge(oceanBoards[oceanBoardItem.id], oceanBoardItem.location, () => (this.overlap = true))
    }
    const trophyBoardItem = this.material(MaterialType.TrophyBoard).getItem<TrophyBoard>()
    if (trophyBoardItem) {
      this.landscape.merge(trophyBoards[trophyBoardItem.id], trophyBoardItem.location, () => (this.overlap = true))
    }
  }

  getPossiblePlaces(canPlaceOnOccupedPlace: boolean): Location[] {
    const drakkars = this.material(MaterialType.Longship).location(LocationType.Landscape).getItems()
    const vikings = this.material(MaterialType.Viking).location(LocationType.Landscape).getItems()
    const places: Location[] = []

    drakkars.forEach(({ location }) => {
      getNeighbors(location).forEach((neighbor) => {
        if (!places.find((p) => p.x === neighbor.x && p.y === neighbor.y)) {
          places.push({ type: LocationType.Landscape, ...neighbor })
        }
      })
    })

    vikings.forEach(({ location }) => {
      getNeighbors(location).forEach((neighbor) => {
        if (!places.find((p) => p.x === neighbor.x && p.y === neighbor.y)) {
          places.push({ type: LocationType.Landscape, ...neighbor })
        }
      })
    })

    return places
      .filter((it) => (it.y ?? 0) >= this.landscape.yMin && (it.y ?? 0) <= this.landscape.yMax)
      .filter((it) => (it.x ?? 0) >= this.landscape.xMin && (it.x ?? 0) <= this.landscape.xMax)
      .filter((it) => this.isEligiblePlace(it.x ?? 0, it.y ?? 0))
      .filter((it) => canPlaceOnOccupedPlace || this.placeIsEmpty(it.x ?? 0, it.y ?? 0))
  }

  getLandscapeCaseType(x: number, y: number): number | undefined {
    if (x < this.landscape.xMin || x > this.landscape.xMax) return undefined
    if (y < this.landscape.yMin || y > this.landscape.yMax) return undefined
    return this.landscape.grid[y + Math.abs(this.landscape.yMin)][x + Math.abs(this.landscape.xMin)]
  }

  getSpecificCaseTypeLocations(type: number): Location[] {
    const locations: Location[] = []
    for (let i = 0; i < this.landscape.grid.length; i++) {
      for (let j = 0; j < this.landscape.grid[i].length; j++) {
        if (this.landscape.grid[i][j] === type) {
          const x = j - Math.abs(this.landscape.xMin)
          const y = i - Math.abs(this.landscape.yMin)
          locations.push({ type: LocationType.Landscape, x, y })
        }
      }
    }
    return locations
  }

  checkIfTileInCaseAndReturnIndex(x: number, y: number): number[] {
    const tiles = this.material(MaterialType.BuildingTile)
      .location(LocationType.Landscape)
      .location((loc) => loc.x === x && loc.y === y)
    if (tiles.length === 0) return []
    return tiles.getIndexes()
  }

  private isEligiblePlace(x: number, y: number): boolean {
    const caseType = this.getLandscapeCaseType(x, y)
    if (!caseType) return false
    const allowedType = getEnumValues(Resource)
    return allowedType.includes(caseType)
  }

  private placeIsEmpty(x: number, y: number): boolean {
    return this.material(MaterialType.Viking).location((loc) => loc.type === LocationType.Landscape && loc.x === x && loc.y === y).length === 0
  }
}
