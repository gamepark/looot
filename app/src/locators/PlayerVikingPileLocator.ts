/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, PileLocator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { fjordBoardLocator } from './FjordBoardLocator'

class PlayerVikingPileLocator extends PileLocator {
  radius = 2
  getCoordinates(location: Location, context: MaterialContext) {
    const base = fjordBoardLocator.getCoordinates(location, context)
    const index = getRelativePlayerIndex(context, location.player)
    switch (index) {
      case 0:
        return { x: base.x! + 16, y: base.y! + 10 }
      case 1:
        return { x: base.x! - 16, y: base.y! + 10 }
      case 2:
        return { x: base.x! + 16, y: base.y! - 10 }
      case 3:
      default:
        return { x: base.x! - 16, y: base.y! - 10 }
    }
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}-${item.id}`
  }
}

export const playerikingPileLocator = new PlayerVikingPileLocator()
