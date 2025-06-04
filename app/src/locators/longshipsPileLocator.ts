/** @jsxImportSource @emotion/react */
import { Locator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Location } from '@gamepark/rules-api'
import { bagLocator } from './BagLocator'

class LongshipsPileLocator extends Locator {
  limit = 1

  getCoordinates(location: Location, context: MaterialContext) {
    return bagLocator.getCoordinates(location, context)
  }
}

export const longshipsPileLocator = new LongshipsPileLocator()
