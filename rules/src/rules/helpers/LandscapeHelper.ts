import {
  AdjacentGroup,
  createAdjacentGroups,
  getAdjacentHexagons,
  HexGridSystem,
  MaterialGame,
  MaterialRulesPart,
  Polyhex,
  XYCoordinates
} from '@gamepark/rules-api'
import { sumBy, times, uniqBy } from 'lodash'
import { Building } from '../../material/Building'
import { getLandscape, isResource, Land, LandscapeBoard, TrophyPlace, Water } from '../../material/LandscapeBoard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { OceanBoard, oceanBoards } from '../../material/OceanBoard'
import { Shield } from '../../material/Shield'
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

  getNewVikingLocations(player: PlayerColor) {
    if (this.remind<Shield[] | undefined>(MemoryType.PlayerSelectedShield, player)?.includes(Shield.PlaceOnOccupiedSpace)) {
      return this.getVikingsLocations()
    } else {
      return this.getLocationsToExpand()
    }
  }

  getLocationsToExpand() {
    const locations: XYCoordinates[] = []
    const { xMin, yMin } = this.landscape
    const vikings = this.getVikingsLocations()
    const vikingsGrid = this.landscape.grid.map((line, y) => line.map((_, x) => vikings.some((viking) => viking.x === x + xMin && viking.y === y + yMin)))
    console.log(vikingsGrid)
    for (let x = xMin; x <= this.landscape.xMax; x++) {
      for (let y = yMin; y <= this.landscape.yMax; y++) {
        if (isResource(this.landscape.grid[y - yMin][x - xMin]) && !vikingsGrid[y - yMin][x - xMin]) {
          const adjacentHexagons = getAdjacentHexagons({ x, y }, HexGridSystem.EvenQ)
          if (adjacentHexagons.some((hex) => this.landscape.grid[hex.y - yMin]?.[hex.x - xMin] === Water || vikingsGrid[hex.y - yMin]?.[hex.x - xMin])) {
            locations.push({ x, y })
          }
        }
      }
    }
    return locations
  }

  getVikingsLocations() {
    return uniqBy(
      this.material(MaterialType.Viking)
        .location(LocationType.Landscape)
        .getItems()
        .map((item) => item.location),
      (location) => `${location.x}_${location.y}`
    )
  }

  getLand(hex: XYCoordinates): Land | undefined {
    const land = this.landscape.getValue(hex)
    return land !== Water && land !== TrophyPlace ? land : undefined
  }

  getBuildingsToTake(player: PlayerColor, location: XYCoordinates) {
    const vikingsGroups = this.getVikingsGroups(player)
    return [
      ...this.getHousesAround(location).getIndexes(),
      ...this.getWatchtowersToTake(player, vikingsGroups),
      ...this.getCastlesToTake(player, vikingsGroups)
    ]
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

  getWatchtowersToTake(player: PlayerColor, vikingsGroups: AdjacentGroup<boolean>[][]) {
    const result: number[] = []
    const connectedTowerLocations = this.getConnectedWatchtowerLocations(vikingsGroups)
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

  getConnectedWatchtowerLocations(vikingsGroups: AdjacentGroup<boolean>[][]) {
    const connectedTowerLocations: XYCoordinates[] = []
    const { xMin, yMin } = this.landscape
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

  getCastlesToTake(player: PlayerColor, vikingsGroups: AdjacentGroup<boolean>[][]) {
    const result: number[] = []
    const { xMin, yMin } = this.landscape
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
}
