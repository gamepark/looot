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
    const deltaX = 14
    switch (context.rules.game.players.length) {
      case 2:
        return { x: x + (index === 0 ? deltaX : -deltaX), y: y - 11 }
      case 3:
        return { x: x + (index === 0 ? deltaX : -deltaX), y: y - 11 }
      case 4:
      default:
        return { x: x + (index <= 1 ? deltaX : -deltaX), y: y - 11 }
    }
  }
}

export const playerVikingPileLocator = new PlayerVikingPileLocator()
