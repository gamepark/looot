import { isCustomMoveType, MaterialGame, MaterialMove, RandomBot } from '@gamepark/rules-api'
import { LoootRules } from '../LoootRules'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from '../rules/CustomMove'
import { RuleId } from '../rules/RuleId'

export class LoootBot extends RandomBot<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>, number> {
  constructor(playerId: number) {
    super(LoootRules, playerId)
  }

  override getLegalMoves(game: MaterialGame<number, MaterialType, LocationType>): MaterialMove<number, MaterialType, LocationType>[] {
    const rules = new LoootRules(game)
    const legalMoves = super.getLegalMoves(game)
    if (rules.game.rule?.id === RuleId.TakeLongship) {
      return legalMoves.filter((it) => isCustomMoveType(CustomMoveType.Pass)(it))
    }
    return legalMoves
  }
}
