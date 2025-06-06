import {
  AdjacentGroup,
  createAdjacentGroups,
  getAdjacentHexagons,
  HexGridSystem,
  Location,
  MaterialGame,
  MaterialRulesPart,
  Polyhex,
  XYCoordinates
} from '@gamepark/rules-api'
import { sumBy, times } from 'lodash'
import { Building } from '../../material/Building'
import { getLandscape, isResource, Land, LandscapeBoard, TrophyPlace, Water } from '../../material/LandscapeBoard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { OceanBoard, oceanBoards } from '../../material/OceanBoard'
import { TrophyBoard, trophyBoards } from '../../material/TrophyBoard'
import { PlayerColor } from '../../PlayerColor'
import { MemoryType } from '../Memory'

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
      getAdjacentHexagons(location as XYCoordinates, HexGridSystem.EvenQ).forEach((neighbor) => {
        if (!places.find((p) => p.x === neighbor.x && p.y === neighbor.y)) {
          places.push({ type: LocationType.Landscape, ...neighbor })
        }
      })
    })

    vikings.forEach(({ location }) => {
      getAdjacentHexagons(location as XYCoordinates, HexGridSystem.EvenQ).forEach((neighbor) => {
        if (!places.find((p) => p.x === neighbor.x && p.y === neighbor.y)) {
          places.push({ type: LocationType.Landscape, ...neighbor })
        }
      })
    })

    return places
      .filter((it) => (it.y ?? 0) >= this.landscape.yMin && (it.y ?? 0) <= this.landscape.yMax)
      .filter((it) => (it.x ?? 0) >= this.landscape.xMin && (it.x ?? 0) <= this.landscape.xMax)
      .filter((it) => isResource(this.getLand({ x: it.x ?? 0, y: it.y ?? 0 })))
      .filter((it) => (canPlaceOnOccupedPlace ? this.placeIsNotEmpty(it.x ?? 0, it.y ?? 0) : this.placeIsEmpty(it.x ?? 0, it.y ?? 0)))
  }

  private placeIsEmpty(x: number, y: number): boolean {
    return this.material(MaterialType.Viking).location((loc) => loc.type === LocationType.Landscape && loc.x === x && loc.y === y).length === 0
  }

  getLand(hex: XYCoordinates): Land | undefined {
    const land = this.landscape.getValue(hex)
    return land !== Water && land !== TrophyPlace ? land : undefined
  }

  getHousesAround(hex: XYCoordinates) {
    const around = getAdjacentHexagons(hex, HexGridSystem.EvenQ)
    return this.material(MaterialType.BuildingTile)
      .id(Building.House)
      .location(LocationType.Landscape)
      .location((location) => around.some((hex) => location.x === hex.x && location.y === hex.y))
  }

  getVikingsGroups(player: PlayerColor) {
    const grid = this.landscape.grid.map((line) => line.map((_) => false))
    const vikings = this.material(MaterialType.Viking).id(player).location(LocationType.Landscape).getItems()
    for (const viking of vikings) {
      grid[viking.location.y! - this.landscape.yMin][viking.location.x! - this.landscape.xMin] = true
    }
    const hexGridSystem = this.landscape.xMin % 2 === 0 ? HexGridSystem.EvenQ : HexGridSystem.OddQ
    return createAdjacentGroups(grid, { hexGridSystem: hexGridSystem })
  }

  getWatchtowersToTake(player: PlayerColor) {
    const result: number[] = []
    const connectedTowerLocations = this.getConnectedWatchtowerLocations(player)
    const watchtowers = this.material(MaterialType.BuildingTile).location(LocationType.Landscape).id(Building.Watchtower)
    for (const index of watchtowers.getIndexes()) {
      const watchtower = watchtowers.getItem(index)
      const tilesToGet = sumBy(connectedTowerLocations, ({ x, y }) => (watchtower.location.x === x && watchtower.location.y === y ? 1 : 0))
      const towersTaken = this.remind<number[]>(MemoryType.PlayerTowersTaken, player)
      const countTaken = towersTaken.filter((i) => i === index).length
      for (let i = 0; i < Math.min(watchtower.quantity ?? 1, tilesToGet - countTaken); i++) {
        result.push(index)
        towersTaken.push(index)
      }
    }
    return result
  }

  getConnectedWatchtowerLocations(player: PlayerColor) {
    const connectedTowerLocations: XYCoordinates[] = []
    const { xMin, yMin } = this.landscape
    const vikingsGroups = this.getVikingsGroups(player)
    const towerLocations = this.getWatchtowersLocations()
    for (const towerLocation of towerLocations) {
      const adjacentGroups: (AdjacentGroup<boolean> & { towers?: XYCoordinates[] })[] = []
      for (const { x, y } of getAdjacentHexagons(towerLocation, HexGridSystem.EvenQ)) {
        const adjacentGroup = vikingsGroups.at(y - yMin)?.at(x - xMin)
        if (adjacentGroup?.values.length && !adjacentGroups.includes(adjacentGroup)) {
          adjacentGroups.push(adjacentGroup)
        }
      }
      for (const adjacentGroup of adjacentGroups) {
        if (adjacentGroup.towers) {
          connectedTowerLocations.push(...adjacentGroup.towers)
          times(adjacentGroup.towers.length, () => connectedTowerLocations.push(towerLocation))
          adjacentGroup.towers.push(towerLocation)
        } else {
          adjacentGroup.towers = [towerLocation]
        }
      }
    }
    return connectedTowerLocations
  }

  getWatchtowersLocations(): XYCoordinates[] {
    const locations: XYCoordinates[] = []
    for (let y = 0; y < this.landscape.grid.length; y++) {
      for (let x = 0; x < this.landscape.grid[y].length; x++) {
        if (this.landscape.grid[y][x] === Building.Watchtower) {
          locations.push({ x: x + this.landscape.xMin, y: y + this.landscape.yMin })
        }
      }
    }
    return locations
  }

  getCastlesToTake(player: PlayerColor) {
    const result: number[] = []
    const { xMin, yMin } = this.landscape
    const vikingsGroups = this.getVikingsGroups(player)
    const castles = this.material(MaterialType.BuildingTile).location(LocationType.Landscape).id(Building.Castle)
    for (const index of castles.getIndexes()) {
      const castle = castles.getItem(index)
      const adjacentHexagons = getAdjacentHexagons(castle.location as XYCoordinates, HexGridSystem.EvenQ)
      const biggestAdjacentGroup = Math.max(...adjacentHexagons.map(({ x, y }) => vikingsGroups[y - yMin]?.[x - xMin]?.values.length ?? 0))
      const tilesToGet = Math.floor(biggestAdjacentGroup / 4)
      const castlesTaken = this.remind<number[]>(MemoryType.PlayerCastlesTaken, player)
      const countTaken = castlesTaken.filter((i) => i === index).length
      for (let i = 0; i < Math.min(castle.quantity ?? 1, tilesToGet - countTaken); i++) {
        result.push(index)
        castlesTaken.push(index)
      }
    }
    return result
  }

  private placeIsNotEmpty(x: number, y: number): boolean {
    return this.material(MaterialType.Viking).location((loc) => loc.type === LocationType.Landscape && loc.x === x && loc.y === y).length > 0
  }
}
