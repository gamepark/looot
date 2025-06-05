import { Location, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { PlayerColor } from '../../../PlayerColor'
import { getNeighbors } from '../utils'
export class CastleVikingGroupHelper extends MaterialRulesPart {
  path: Location[]
  pathWithoutCastle: Location[]
  biggerVikingGroup: number
  constructor(
    game: MaterialGame,
    readonly player: PlayerColor | undefined = game.rule?.player
  ) {
    super(game)
    this.path = []
    this.pathWithoutCastle = []
    this.biggerVikingGroup = 0
  }

  getBiggerVikingGroup(basePath: Location[]) {
    this.pathWithoutCastle = basePath
    while (this.pathWithoutCastle.length > 0) {
      this.checkPath()
    }
    return this.biggerVikingGroup
  }

  private checkPath() {
    this.path = this.pathWithoutCastle.splice(0, 1)
    for (const location of this.path) {
      this.checkNeighbors(location)
    }
    if (this.path.length > this.biggerVikingGroup) {
      this.biggerVikingGroup = this.path.length
    }
  }

  private checkNeighbors(location: Location) {
    const neighbors = getNeighbors(location)
    neighbors.forEach((neighbor) => {
      this.checkVikingAndAddToPath(neighbor)
    })
  }

  private checkVikingAndAddToPath(neighbor: { x: number; y: number }) {
    const playerViking = this.material(MaterialType.Viking)
      .location((loc) => loc.type === LocationType.Landscape && loc.y === neighbor.y && loc.x === neighbor.x)
      .id(this.player)
    if (playerViking.length) {
      this.checkIfVikingIsNotInPathAndAddIt(neighbor)
    }
  }

  private checkIfVikingIsNotInPathAndAddIt(neighbor: { x: number; y: number }) {
    if (!this.path.find((loc) => loc.x === neighbor.x && loc.y === neighbor.y)) {
      const index = this.pathWithoutCastle.findIndex((loc) => loc.x === neighbor.x && loc.y === neighbor.y)
      if (index !== -1) {
        this.pathWithoutCastle.splice(index, 1)
      }
      this.path.push({ type: LocationType.Landscape, ...neighbor })
    }
  }
}
