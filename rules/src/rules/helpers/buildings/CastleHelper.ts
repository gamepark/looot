import { Location, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Building } from '../../../material/Building'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { PlayerColor } from '../../../PlayerColor'
import { MemoryType } from '../../Memory'
import { LandscapeHelper } from '../LandscapeHelper'
import { getNeighbors, locationsEquals } from '../utils'

export class CastleHelper extends MaterialRulesPart {
  landscapeHelper: LandscapeHelper
  castles: Location[]
  castlesToGet: Location[]
  path: Location[]
  constructor(
    game: MaterialGame,
    landscapeHelper: LandscapeHelper,
    readonly player: PlayerColor | undefined = game.rule?.player
  ) {
    super(game)
    this.landscapeHelper = landscapeHelper
    this.castles = this.landscapeHelper.getSpecificCaseTypeLocations(Building.Castle)
    this.castlesToGet = []
    this.path = []
  }

  checkAndGetCastle(): number[] {
    for (const item of this.castles) {
      this.checkPath(item)
    }
    this.memorizeCastles(this.castlesToGet)
    return this.getMovesFromCastlesToGet()
  }

  private getMovesFromCastlesToGet(): number[] {
    const castles: number[] = []
    this.castlesToGet.forEach((it) => {
      castles.push(...this.landscapeHelper.checkIfTileInCaseAndReturnIndex(it.x ?? 0, it.y ?? 0))
    })
    return castles
  }

  private checkPath(castle: Location) {
    this.path = [castle]
    for (const location of this.path) {
      this.checkNeighbors(location)
    }
    const castlesAlreadyReached: Location[] | undefined = this.remind(MemoryType.PlayerCastlesAlreadyReached, this.player) ?? []
    const nbTimeCastleReached = castlesAlreadyReached.filter((it) => locationsEquals(castle, it)).length
    this.checkPathAndAddCastle(castle, nbTimeCastleReached)
  }

  private checkPathAndAddCastle(castle: Location, nbTimeCastleReached: number) {
    const pathLengthWithoutCastle = this.path.length - 1
    for (let i = 0; i < Math.floor(pathLengthWithoutCastle / 4) - nbTimeCastleReached; i++) {
      this.castlesToGet.push(castle)
    }
  }

  private memorizeCastles(castles: Location[]) {
    this.memorize(MemoryType.PlayerCastlesAlreadyReached, (oldValue?: Location[]) => (oldValue ? [...oldValue, ...castles] : castles), this.player)
  }

  private checkNeighbors(location: Location) {
    const neighbors = getNeighbors(location)
    neighbors.forEach((neighbor) => {
      this.addNeighborToPathIfPlayerVikingIsInNeighbor(neighbor)
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
}
