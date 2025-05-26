/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, Locator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'

class FjordBoardLocator extends Locator {
  getRotateZ(location: Location, context: MaterialContext): number {
    const index = getRelativePlayerIndex(context, location.player)
    return index >= 2 ? 180 : 0
  }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    switch (context.rules.game.players.length) {
      case 2:
        return playersPositionFor2[index]
      case 3:
        return playersPositionFor3[index]
      case 4:
      default:
        return playersPositionFor4[index]
    }
  }
}

const playersPositionFor2: XYCoordinates[] = [
  { x: -36, y: 10 },
  { x: 36, y: 10 }
]

const playersPositionFor3: XYCoordinates[] = [
  { x: -40, y: 15 },
  { x: 40, y: 15 },
  { x: -40, y: -15 }
]

const playersPositionFor4: XYCoordinates[] = [
  { x: -45, y: 15 },
  { x: 45, y: 15 },
  { x: -45, y: -15 },
  { x: 45, y: -15 }
]

export const fjordBoardLocator = new FjordBoardLocator()
