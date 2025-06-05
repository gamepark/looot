/** @jsxImportSource @emotion/react */
import { Locator } from '@gamepark/react-game'
import { ItemContext, MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { bagLocator } from './BagLocator'

class LongshipsPileLocator extends Locator {
  limit = 1

  getCoordinates(location: Location, context: MaterialContext) {
    return bagLocator.getCoordinates(location, context)
  }
  getItemCoordinates(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    const { x, y } = super.getItemCoordinates(item, context)
    return { x, y, z: -1 }
  }
}

export const longshipsPileLocator = new LongshipsPileLocator()
