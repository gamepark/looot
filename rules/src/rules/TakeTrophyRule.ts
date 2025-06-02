import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Resource } from '../material/Resource'
import { CustomMoveType } from './CustomMove'
import { RuleId } from './RuleId'

export class TakeTrophyRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove[] {
    console.log("coucou")
    const moves: MaterialMove[] = []
    if(this.playerTrophy.length === 0) {
      moves.push(...this.eligiblesTrophies.moveItems({ type: LocationType.FjordBoardHexSpace, x: 1, y: 1, player: this.player }))
    }
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(isMoveItemType(MaterialType.Trophy)(move)) {
      moves.push(this.startNext())
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.startNext()]
    }
    return []
  }

  startNext() {
    if (this.checkIfAllPlayerDoesntHaveVikingToPlace()) return this.endGame()
    return this.startPlayerTurn(RuleId.PlaceViking, this.nextPlayer)
  }

  get eligiblesTrophies() {
    const nbPlayerAxes = this.material(MaterialType.ResourceTile).location(LocationType.FjordBoardHexSpace).player(this.player).id(Resource.Axe).length
    return this.material(MaterialType.Trophy)
      .location(LocationType.Landscape)
      .filter((it) => it.id! <= nbPlayerAxes)
  }

  get playerTrophy() {
    return this.material(MaterialType.Trophy).location(LocationType.FjordBoardHexSpace).player(this.player)
  }

  checkIfAllPlayerDoesntHaveVikingToPlace() {
    let allPlayerFinished = true
    this.game.players.forEach((player) => {
      if (this.material(MaterialType.Viking).location(LocationType.PlayerVikingPile).player(player).length > 0) {
        allPlayerFinished = false
      }
    })
    return allPlayerFinished
  }
}
