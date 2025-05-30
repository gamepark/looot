import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class PlaceVikingRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.playerVikings.moveItems(() => ({ type: LocationType.Landscape, x: 1, y: 1 })))
    moves.push(...this.playerVikings.moveItems(() => ({ type: LocationType.Landscape, x: 3, y: 1 })))
    return moves
  }

  get playerVikings() {
    return this.material(MaterialType.Viking).location(LocationType.PlayerVikingPile).player(this.player)
  }
}
