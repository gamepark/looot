import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMove'
import { RuleId } from './RuleId'
import { FjordBoardHelper } from './helpers/FjordBoardHelper'

export class TakeLongshipRule extends PlayerTurnRule {
  fjordBoardHelper = new FjordBoardHelper(this.game)

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    this.fjordBoardHelper.getPossiblePlaces().forEach((place) => {
      moves.push(...this.longships.moveItems(place))
    })
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Longship)(move)) {
      const oldLongshipLocation = this.material(MaterialType.Longship).index(move.itemIndex).getItem()?.location
      if (oldLongshipLocation?.type === LocationType.Landscape) {
        moves.push(this.material(MaterialType.Longship).location(LocationType.InsideBag).moveItem(oldLongshipLocation))
      }
    }
    return moves
  }

  afterItemMove(_: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.fjordBoardHelper.checkLongship())
    moves.push(this.startRule(RuleId.TakeTrophy))
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if(isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.startRule(RuleId.TakeTrophy)]
    }
    return []
  }

  get longships() {
    return this.material(MaterialType.Longship).location(LocationType.Landscape)
  }
}
