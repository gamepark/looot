import { MaterialGameSetup } from '@gamepark/rules-api'
import { LoootOptions } from './LoootOptions'
import { LoootRules } from './LoootRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class LoootSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, LoootOptions> {
  Rules = LoootRules

  setupMaterial(_options: LoootOptions) {
    // TODO
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
