import { LocationType } from '@gamepark/looot/material/LocationType'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { RuleId } from '@gamepark/looot/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isMoveItem, isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { CompleteConstructionSiteHistory } from './components/CompleteConstructionSiteHistory'
import { CompleteLongshipHistory } from './components/CompleteLongshipHistory'
import { PlaceBuildingHistory } from './components/PlaceBuildingHistory'
import { PlaceResourceHistory } from './components/PlaceResourceHistory'
import { PlaceVikingHistory } from './components/PlaceVikingHistory'
import { TakeLongshipHistory } from './components/TakeLongshipHistory'
import { TakeTrophyHistory } from './components/TakeTrophyHistory'
import { UseShieldHistory } from './components/UseShieldHistory'

export class LoootLogs implements LogDescription {
  getMovePlayedLogDescription(move: MaterialMove, context: MoveComponentContext): MovePlayedLogDescription | undefined {
    const ruleId: RuleId = context.game.rule.id
    const actionPlayer = context.action.playerId
    if (ruleId === RuleId.PlaceViking && this.getMoveLocationType(move) === LocationType.Landscape) {
      return {
        Component: PlaceVikingHistory,
        player: actionPlayer
      }
    }
    if (ruleId === RuleId.PlaceViking && this.getMoveLocationType(move) === LocationType.FjordBoardHexSpace) {
      return {
        Component: UseShieldHistory,
        player: actionPlayer
      }
    }
    if (ruleId === RuleId.PlaceResource && isMoveItemType(MaterialType.ResourceTile)(move)) {
      return {
        Component: PlaceResourceHistory,
        player: actionPlayer
      }
    }
    if (ruleId === RuleId.PlaceResource && isMoveItemType(MaterialType.BuildingTile)(move)) {
      return {
        Component: PlaceBuildingHistory,
        player: actionPlayer
      }
    }
    if (ruleId === RuleId.PlaceResource && isMoveItemType(MaterialType.LongshipTile)(move)) {
      return {
        Component: CompleteLongshipHistory,
        player: actionPlayer
      }
    }
    if (ruleId === RuleId.PlaceResource && isMoveItemType(MaterialType.ConstructionSiteTile)(move)) {
      return {
        Component: CompleteConstructionSiteHistory,
        player: actionPlayer
      }
    }
    if (
      ruleId === RuleId.TakeLongshipAndTrophy &&
      isMoveItemType(MaterialType.LongshipTile)(move) &&
      this.getMoveLocationType(move) === LocationType.FjordBoardHexSpace
    ) {
      if (move.location.rotation) {
        return {
          Component: CompleteLongshipHistory,
          player: actionPlayer
        }
      } else {
        return {
          Component: TakeLongshipHistory,
          player: actionPlayer
        }
      }
    }
    if (ruleId === RuleId.TakeLongshipAndTrophy && isMoveItemType(MaterialType.TrophyTile)(move)) {
      return {
        Component: TakeTrophyHistory,
        player: actionPlayer
      }
    }
    return undefined
  }

  getMoveLocationType(move: MaterialMove) {
    return isMoveItem(move) ? move.location.type : undefined
  }
}
