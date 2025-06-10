/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { ScoreSheetBoxDescription } from './ScoreSheetBoxDescription'

class ScorePadBoxLocator extends Locator {
  locationDescription = new ScoreSheetBoxDescription()
  parentItemType = MaterialType.ScorePad

  getPositionOnParent(location: Location) {
    return { x: 30.5 + location.x! * 18.5, y: location.y === 0 ? 5.5 : 14.5 + 9 * (location.y! - 1) }
  }
}

export const scorePadBoxLocator = new ScorePadBoxLocator()
