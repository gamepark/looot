import {
  getEnumValues,
  HexGridSystem,
  hexRotate,
  hexTranslate,
  Location,
  MaterialGame,
  MaterialMove,
  MaterialRulesPart,
  XYCoordinates
} from '@gamepark/rules-api'
import { Land, LandscapeBoard, landscapeBoards, Water } from '../../material/LandscapeBoard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { OceanBoard, oceanBoards } from '../../material/OceanBoard'
import { Resource } from '../../material/Resource'
import { trophyBoards } from '../../material/TrophyBoard'
import { PlayerColor } from '../../PlayerColor'
import { getNeighbors } from './utils'

export type Hex = Land | typeof Water | undefined

export class LandscapeHelper extends MaterialRulesPart {
  landscape: Hex[][] = []
  xMin = 0
  yMin = 0

  get xMax() {
    return this.xMin + Math.max(...this.landscape.map((line) => line.length))
  }

  get yMax() {
    return this.yMin + this.landscape.length
  }

  constructor(game: MaterialGame) {
    super(game)
    const landscapeBoardItems = this.material(MaterialType.LandscapeBoard).getItems<LandscapeBoard>()
    for (const item of landscapeBoardItems) {
      this.addBoardToLandscape(landscapeBoards[item.id], item.location)
    }
    const oceanBoardItem = this.material(MaterialType.OceanBoard).getItem<OceanBoard>()
    if (oceanBoardItem) {
      this.addBoardToLandscape(oceanBoards[oceanBoardItem.id], oceanBoardItem.location)
    }

    const trophyBoardItem = this.material(MaterialType.TrophyBoard).getItem<OceanBoard>()
    if (trophyBoardItem) {
      this.addBoardToLandscape(trophyBoards[trophyBoardItem.id], trophyBoardItem.location)
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
      .filter((it) => (it.y ?? 0) >= this.yMin && (it.y ?? 0) <= this.yMax)
      .filter((it) => (it.x ?? 0) >= this.xMin && (it.x ?? 0) <= this.xMax)
      .filter((it) => this.isEligiblePlace(it.x ?? 0, it.y ?? 0))
      .filter((it) => canPlaceOnOccupedPlace || this.placeIsEmpty(it.x ?? 0, it.y ?? 0))
  }

  getLandscapeCaseType(x: number, y: number): number | undefined {
    if (x < this.xMin || x >= this.xMax) return undefined
    if (y < this.yMin || y >= this.yMax) return undefined
    return this.landscape[y + Math.abs(this.yMin)][x + Math.abs(this.xMin)]
  }

  getSpecificCaseTypeLocations(type: number): Location[] {
    const locations: Location[] = []
    for (let i = 0; i < this.landscape.length; i++) {
      for (let j = 0; j < this.landscape[i].length; j++) {
        if (this.landscape[i][j] === type) {
          const x = j - Math.abs(this.xMin)
          const y = i - Math.abs(this.yMin)
          locations.push({ type: LocationType.Landscape, x, y })
        }
      }
    }
    return locations
  }

  checkIfTileInCaseAndMoveIt(x: number, y: number, player: PlayerColor): MaterialMove[] {
    const tiles = this.material(MaterialType.BuildingTile)
      .location(LocationType.Landscape)
      .location((loc) => loc.x === x && loc.y === y)
    if (tiles.length === 0) return []
    return [tiles.moveItem({ type: LocationType.PlayerBuildingIdleLayout, player })]
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

  private addBoardToLandscape(board: Hex[][], location: Location) {
    for (let y = 0; y < board.length; y++) {
      const line = board[y]
      for (let x = 0; x < line.length; x++) {
        this.addLandToLandscape(line[x], { x, y }, location)
      }
    }
  }

  private addLandToLandscape(hex: Hex, coordinates: XYCoordinates, location: Location) {
    if (hex === undefined) return
    const rotatedCoordinates = hexRotate(coordinates, location.rotation as number, HexGridSystem.EvenQ)
    const { x, y } = hexTranslate(rotatedCoordinates, location as XYCoordinates, HexGridSystem.EvenQ)
    while (y < this.yMin) {
      this.landscape.unshift([])
      this.yMin--
    }
    while (x < this.xMin) {
      for (const line of this.landscape) {
        line.unshift(undefined)
      }
      this.xMin--
    }
    if (!this.landscape[y - this.yMin]) {
      this.landscape[y - this.yMin] = []
    }
    this.landscape[y - this.yMin][x - this.xMin] = hex
  }
}
