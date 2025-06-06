import {
  CompetitiveScore,
  hideItemId,
  isMoveItem,
  ItemMove,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  StakingStrategy,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Trophy, trophyValue } from './material/Trophy'
import { PlayerColor } from './PlayerColor'
import { ScoreHelper } from './rules/helpers/ScoreHelper'
import { MemoryType } from './rules/Memory'
import { PlaceResourceRule } from './rules/PlaceResourceRule'
import { PlaceVikingRule } from './rules/PlaceVikingRule'
import { RuleId } from './rules/RuleId'
import { TakeLongshipAndTrophyRule } from './rules/TakeLongshipAndTrophyRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class LoootRules extends SecretMaterialRules implements TimeLimit<MaterialGame, MaterialMove, PlayerColor>, CompetitiveScore {
  scoreHelper = new ScoreHelper(this.game)
  rules = {
    [RuleId.PlaceViking]: PlaceVikingRule,
    [RuleId.PlaceResource]: PlaceResourceRule,
    [RuleId.TakeLongshipAndTrophy]: TakeLongshipAndTrophyRule
  }

  locationsStrategies = {
    [MaterialType.Viking]: {
      [LocationType.Landscape]: new StakingStrategy()
    },
    [MaterialType.LongshipTile]: {
      [LocationType.InsideBag]: new PositiveSequenceStrategy()
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
    return 75
  }

  getScore(playerId: PlayerColor): number {
    return this.remind(MemoryType.PlayerScore, playerId)
  }

  getTieBreaker(tieBreaker: number, playerId: PlayerColor): number | undefined {
    if (tieBreaker === 1) {
      const playerTrophy = this.material(MaterialType.TrophyTile).location(LocationType.FjordBoardHexSpace).player(playerId).getItem()
      if (!playerTrophy) return 0
      return trophyValue[playerTrophy.id as Trophy]
    }
    return undefined
  }
}
