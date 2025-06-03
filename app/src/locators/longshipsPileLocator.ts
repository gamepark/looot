/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Location } from '@gamepark/rules-api'
import { bagLocator } from './BagLocator'

class LongshipsPileLocator extends PileLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    return bagLocator.getCoordinates(location, context)
  }
}

export const longshipsPileLocator = new LongshipsPileLocator()
