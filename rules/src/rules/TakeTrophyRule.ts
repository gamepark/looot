import { CustomMove, isCustomMoveType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Resource } from '../material/Resource'
import { CustomMoveType } from './CustomMove'
import { RuleId } from './RuleId'

export class TakeTrophyRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (this.eligiblesTrophies.length === 0 || this.playerTrophy.length > 0) {
      return [this.startRule(RuleId.PlaceViking)]
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.eligiblesTrophies.moveItems({ type: LocationType.FjordBoardHexSpace, x: 1, y: 1, player: this.player }))
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  afterItemMove(_: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(this.startRule(RuleId.PlaceViking))
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.startRule(RuleId.PlaceViking)]
    }
    return []
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
}
