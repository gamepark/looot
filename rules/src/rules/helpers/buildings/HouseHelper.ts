import { getAdjacentHexagons, HexGridSystem, Location, MaterialGame, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { Building } from '../../../material/Building'
import { PlayerColor } from '../../../PlayerColor'
import { LandscapeHelper } from '../LandscapeHelper'

export class HouseHelper extends MaterialRulesPart {
  landscapeHelper
  constructor(
    game: MaterialGame,
    landscapeHelper: LandscapeHelper,
    readonly player: PlayerColor | undefined = game.rule?.player
  ) {
    super(game)
    this.landscapeHelper = landscapeHelper
  }

  checkAndGetHouse(moveLocation: Location): number[] {
    const neighbors = getAdjacentHexagons(moveLocation as XYCoordinates, HexGridSystem.EvenQ)
    const houses: number[] = []
    for (const neighbor of neighbors) {
      const neighborType = this.landscapeHelper.getLand(neighbor)
      if (neighborType === Building.House) {
        houses.push(...this.landscapeHelper.checkIfTileInCaseAndReturnIndex(neighbor.x, neighbor.y))
      }
    }
    return houses
  }
}
