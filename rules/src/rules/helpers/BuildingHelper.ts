import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { CastleHelper } from './buildings/CastleHelper'
import { WatchTowerHelper } from './buildings/WatchTowerHelper'
import { LandscapeHelper } from './LandscapeHelper'

export class BuildingHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player: number | undefined = game.rule?.player,
    readonly landscapeHelper = new LandscapeHelper(game),
    readonly watchTowerHelper = new WatchTowerHelper(game, landscapeHelper),
    readonly castleHelper = new CastleHelper(game, landscapeHelper)
  ) {
    super(game)
  }

  checkAndGetTower(): number[] {
    return this.watchTowerHelper.checkAndGetTower()
  }

  checkAndGetCastle(): number[] {
    return this.castleHelper.checkAndGetCastle()
  }
}
