/** @jsxImportSource @emotion/react */
import { LoootRules } from '@gamepark/looot/LoootRules'
import { LocationType } from '@gamepark/looot/material/LocationType'
import { ScoreHelper } from '@gamepark/looot/rules/helpers/ScoreHelper'
import { BoardDescription } from '@gamepark/react-game'
import { ItemContext } from '@gamepark/react-game/dist/locators/Locator'
import { Location, MaterialItem } from '@gamepark/rules-api'
import ScorePad from '../images/scoring/Scorepad.jpg'
import { ScorePadHelp } from './help/ScorePadHelp'

export class ScorePadDescription extends BoardDescription {
  width = 10
  height = 10
  image = ScorePad
  staticItem = { location: { type: LocationType.ScorePadPlace } }

  help = ScorePadHelp

  getLocations(_item: MaterialItem, context: ItemContext) {
    const rules = context.rules as LoootRules
    if (!rules.isOver()) return []
    const locations: Location[] = []
    for (let x = 0; x < rules.players.length; x++) {
      const player = rules.players[x]
      const scoreHelper = new ScoreHelper(rules.game, player)
      locations.push({ type: LocationType.ScorePadBox, x, y: 0, player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 1, z: scoreHelper.getCastleValue() * scoreHelper.getNbCastle(), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 2, z: scoreHelper.getWatchTowerValue() * scoreHelper.getNbWatchTower(), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 3, z: scoreHelper.getHouseValue() * scoreHelper.getNbHouse(), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 4, z: scoreHelper.getGoldValue() * scoreHelper.getNbGold(), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 5, z: scoreHelper.getSheepValue() * scoreHelper.getNbSheep(), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 6, z: scoreHelper.getWoodValue() * scoreHelper.getNbWood(), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 7, z: scoreHelper.getConstructionSiteScore(), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 8, z: scoreHelper.getTrophyScore(), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 9, z: -scoreHelper.getNotReturnedLongshipMalus(), player })
      locations.push({ type: LocationType.ScorePadBox, x, y: 10, z: scoreHelper.getTotalScore(), player })
    }
    return locations
  }
}

export const scorePadDescription = new ScorePadDescription()
