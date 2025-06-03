import {
  CompetitiveScore,
  hideItemId,
  isMoveItem,
  ItemMove,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules, StakingStrategy,
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
import { TakeLongshipRule } from './rules/TakeLongshipRule'
import { TakeTrophyRule } from './rules/TakeTrophyRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class LoootRules extends SecretMaterialRules implements TimeLimit<MaterialGame, MaterialMove, PlayerColor>, CompetitiveScore {
  scoreHelper = new ScoreHelper(this.game)
  rules = {
    [RuleId.PlaceViking]: PlaceVikingRule,
    [RuleId.PlaceResource]: PlaceResourceRule,
    [RuleId.TakeLongship]: TakeLongshipRule,
    [RuleId.TakeTrophy]: TakeTrophyRule
  }

  locationsStrategies = {
    [MaterialType.BuildingTile]: {
      [LocationType.PlayerBuildingIdleLayout]: new PositiveSequenceStrategy()
    },
    [MaterialType.ResourceTile]: {
      [LocationType.PlayerResourcesIdleLayout]: new PositiveSequenceStrategy()
    },
    [MaterialType.Viking]: {
      [LocationType.Landscape]: new StakingStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Longship]: {
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

  getScore(playerId: PlayerColor): number {
    return this.remind(MemoryType.PlayerScore, playerId)
  }

  getTieBreaker(tieBreaker: number, playerId: PlayerColor): number | undefined {
    if (tieBreaker === 1) {
      const playerTrophy = this.material(MaterialType.Trophy).location(LocationType.FjordBoardHexSpace).player(playerId).getItem()
      if (!playerTrophy) return 0
      return trophyValue[playerTrophy.id as Trophy]
    }
    return undefined
  }
}
