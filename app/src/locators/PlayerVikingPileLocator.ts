/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, ListLocator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Location } from '@gamepark/rules-api'
import { fjordBoardLocator } from './FjordBoardLocator'

class PlayerVikingPileLocator extends ListLocator {
  gap = { y: 1.85 }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x = 0, y = 0 } = fjordBoardLocator.getCoordinates(location, context)
    const index = getRelativePlayerIndex(context, location.player)
    const deltaX = index % 2 ? -14 : 14
    return { x: x + deltaX, y: y - 11 }
  }
}

export const playerVikingPileLocator = new PlayerVikingPileLocator()
