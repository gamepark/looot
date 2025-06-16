/** @jsxImportSource @emotion/react */
import { Locator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Location, XYCoordinates } from '@gamepark/rules-api'

class BagLocator extends Locator {
  coordinatesCache?: XYCoordinates

  getCoordinates(_: Location, context: MaterialContext) {
    if (this.coordinatesCache) return this.coordinatesCache
    switch (context.rules.players.length) {
      case 2:
        this.coordinatesCache = { x: 28, y: -13 }
        break
      case 3:
      default:
        this.coordinatesCache = { x: -40, y: -5 }
        break
    }
    return this.coordinatesCache
  }
}

export const bagLocator = new BagLocator()
