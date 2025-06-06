import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { WatchTowerHelper } from './buildings/WatchTowerHelper'
import { LandscapeHelper } from './LandscapeHelper'

export class BuildingHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player: number | undefined = game.rule?.player,
    readonly landscapeHelper = new LandscapeHelper(game),
    readonly watchTowerHelper = new WatchTowerHelper(game, landscapeHelper)
  ) {
    super(game)
  }

  checkAndGetTower(): number[] {
    return this.watchTowerHelper.checkAndGetTower()
  }
}
