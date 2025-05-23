import { MaterialGameSetup } from '@gamepark/rules-api'
import { sample } from 'lodash'
import { LoootOptions } from './LoootOptions'
import { LoootRules } from './LoootRules'
import { LocationType } from './material/LocationType'
import { getMainBoard } from './material/MainBoard'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class LoootSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, LoootOptions> {
  Rules = LoootRules

  setupMaterial(_options: LoootOptions) {
    getMainBoard(this.players.length).forEach((board, index) => {
      const id = index * 10 + sample([0, 1, 2])
      this.material(MaterialType.MainBoard).createItem({ id: board, location: { type: LocationType.MainBoard, rotation: sample([false, true]), id } })
    })
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
