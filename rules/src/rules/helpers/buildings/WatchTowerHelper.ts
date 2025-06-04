import { Location, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Building } from '../../../material/Building'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { PlayerColor } from '../../../PlayerColor'
import { MemoryType } from '../../Memory'
import { LandscapeHelper } from '../LandscapeHelper'
import { getNeighbors, locationsEquals } from '../utils'

export class WatchTowerHelper extends MaterialRulesPart {
  landscapeHelper: LandscapeHelper
  towers: Location[]
  towersToGet: number[][]
  path: Location[]
  constructor(
    game: MaterialGame,
    landscapeHelper: LandscapeHelper,
    readonly player: PlayerColor | undefined = game.rule?.player
  ) {
    super(game)
    this.landscapeHelper = landscapeHelper
    this.towers = this.landscapeHelper.getSpecificCaseTypeLocations(Building.Watchtower)
    this.towersToGet = []
    this.path = []
  }

  checkAndGetTower() {
    for (let i = 0; i < this.towers.length; i++) {
      this.checkPath(this.towers[i], i)
    }
    return this.getMovesFromTowersToGet()
  }

  private getMovesFromTowersToGet(): number[] {
    const towers: number[] = []
    this.towersToGet.forEach((it) => {
      const startTowerLocation = this.towers[it[0]]
      const endTowerLocation = this.towers[it[1]]
      this.memorizeTowersPath(startTowerLocation, endTowerLocation)
      towers.push(...this.landscapeHelper.checkIfTileInCaseAndReturnIndex(startTowerLocation.x ?? 0, startTowerLocation.y ?? 0))
      towers.push(...this.landscapeHelper.checkIfTileInCaseAndReturnIndex(endTowerLocation.x ?? 0, endTowerLocation.y ?? 0))
    })
    return towers
  }

  private memorizeTowersPath(startTowerLocation: Location, endTowerLocation: Location) {
    this.memorize(
      MemoryType.PlayerTowersAlreadyLinked,
      (oldValue?: { start: Location; end: Location }[]) =>
        oldValue ? [...oldValue, { start: startTowerLocation, end: endTowerLocation }] : [{ start: startTowerLocation, end: endTowerLocation }],
      this.player
    )
  }

  private checkPath(tower: Location, index: number) {
    this.path = [tower]
    for (const location of this.path) {
      this.checkNeighbors(location, index)
    }
  }

  private checkNeighbors(location: Location, index: number) {
    const neighbors = getNeighbors(location)
    neighbors.forEach((neighbor) => {
      this.addNeighborToPathIfPlayerVikingIsInNeighbor(neighbor)
      this.addTowerInTowersToGetIfTowerIsInNeighbor(neighbor, index)
    })
  }

  private addNeighborToPathIfPlayerVikingIsInNeighbor(neighbor: { x: number; y: number }) {
    const playerViking = this.material(MaterialType.Viking)
      .location((loc) => loc.type === LocationType.Landscape && loc.y === neighbor.y && loc.x === neighbor.x)
      .id(this.player)
    if (playerViking.length) {
      if (!this.path.find((loc) => loc.x === neighbor.x && loc.y === neighbor.y)) {
        this.path.push({ type: LocationType.Landscape, ...neighbor })
      }
    }
  }

  private addTowerInTowersToGetIfTowerIsInNeighbor(neighbor: { x: number; y: number }, startTowerIndex: number) {
    const towerIndex = this.towers.findIndex((it) => it.x === neighbor.x && it.y === neighbor.y)
    if (this.towerNotInTowerToGetAndNotStartTower(towerIndex, startTowerIndex)) {
      this.addTowerInTowersToGetIfNotAlreadyLinked(towerIndex, startTowerIndex)
    }
  }

  private addTowerInTowersToGetIfNotAlreadyLinked(towerIndex: number, startTowerIndex: number) {
    const startTower = this.towers[startTowerIndex]
    const endTower = this.towers[towerIndex]
    const alreadyLinked = this.getTowersAlreadyLinked(startTower, endTower)
    if (!alreadyLinked) {
      this.towersToGet.push([startTowerIndex, towerIndex])
    }
  }

  private getTowersAlreadyLinked(startTower: Location, endTower: Location) {
    const towersAlreadyLinked: { start: Location; end: Location }[] | undefined = this.remind(MemoryType.PlayerTowersAlreadyLinked, this.player) ?? []
    return towersAlreadyLinked.find(
      (it) =>
        (locationsEquals(startTower, it.start) && locationsEquals(endTower, it.end)) ||
        (locationsEquals(endTower, it.start) && locationsEquals(startTower, it.end))
    )
  }

  private towerNotInTowerToGetAndNotStartTower(towerIndex: number, startTowerIndex: number): boolean {
    const pathAlreadyInTowerToGet = this.towersToGet.find((it) => (it[0] === towerIndex && it[1] === startTowerIndex) || (it[0] === startTowerIndex && it[1] === towerIndex))

    return towerIndex !== -1 && towerIndex !== startTowerIndex && !pathAlreadyInTowerToGet
  }
}
