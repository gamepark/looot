/** @jsxImportSource @emotion/react */
import { Locator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { bagLocator } from './BagLocator'

class ScorePadPlaceLocator extends Locator {
  coordinatesCache?: XYCoordinates

  getCoordinates(_: Location, context: MaterialContext) {
    if (this.coordinatesCache) return this.coordinatesCache
    switch (context.rules.players.length) {
      case 2:
        this.coordinatesCache = { x: 38, y: -13 }
        break
      case 3:
        this.coordinatesCache = { x: -30, y: -15 }
        break
      default:
        this.coordinatesCache = bagLocator.getCoordinates(_, context)
        break
    }
    return this.coordinatesCache
  }
}

export const scorePadPlaceLocator = new ScorePadPlaceLocator()
