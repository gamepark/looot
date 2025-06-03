/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, Locator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Coordinates, Location } from '@gamepark/rules-api'
import { landscapeLocator } from './LandscapeLocator'

class FjordBoardLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const landscapeSize = landscapeLocator.getLandscapeSize(context.rules.game)
    const index = getRelativePlayerIndex(context, location.player)
    const deltaX = landscapeSize.width / 2 + 17
    switch (context.rules.game.players.length) {
      case 2:
        return { x: index === 1 ? deltaX : -deltaX, y: 5 }
      case 3:
        return { x: index === 0 ? -deltaX : deltaX, y: index === 1 ? -13 : 13 }
      case 4:
      default:
        return { x: index <= 1 ? -deltaX : deltaX, y: index % 3 ? -13 : 13 }
    }
  }
}

export const fjordBoardLocator = new FjordBoardLocator()
