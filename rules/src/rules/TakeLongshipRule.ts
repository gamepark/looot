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
        moves.push(
          this.material(MaterialType.Longship)
            .location(LocationType.InsideBag)
            .maxBy((item) => item.location.x!)
            .moveItem(oldLongshipLocation)
        )
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!isMoveItemType(MaterialType.Longship)(move)) return moves

    if (move.location.type === LocationType.FjordBoardHexSpace) {
      moves.push(...this.fjordBoardHelper.checkLongship())
    }
    if (move.location.type === LocationType.Landscape) {
      moves.push(this.startRule(RuleId.TakeTrophy))
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.startRule(RuleId.TakeTrophy)]
    }
    return []
  }

  get longships() {
    return this.material(MaterialType.Longship).location(LocationType.Landscape)
  }
}
