import { hideItemId, isMoveItem, ItemMove, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { ScoreHelper } from './rules/helper/ScoreHelper'
import { PlaceResourceRule } from './rules/PlaceResourceRule'
import { PlaceVikingRule } from './rules/PlaceVikingRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class LoootRules
  extends SecretMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
  scoreHelper = new ScoreHelper(this.game)
  rules = {
    [RuleId.PlaceViking]: PlaceVikingRule,
    [RuleId.PlaceResource]: PlaceResourceRule
  }

  locationsStrategies = {
    [MaterialType.BuildingTile]: {
      [LocationType.PlayerResourcesIdleLayout]: new PositiveSequenceStrategy()
    },
    [MaterialType.ResourceTile]: {
      [LocationType.PlayerResourcesIdleLayout]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.LongshipTile]: {
      [LocationType.InsideBag]: hideItemId
    }
  }

  protected afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.FjordBoardHexSpace && move.location.player === this.getActivePlayer()) {
      this.scoreHelper.updateScore()
    }
    return []
  }

  giveTime(): number {
    return 60
  }
}
