/** @jsxImportSource @emotion/react */
import { ListLocator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Location } from '@gamepark/rules-api'
import { fjordBoardLocator } from './FjordBoardLocator'

class PlayerBuildingIdleLayoutLocator extends ListLocator {
  gap = { x: 3 }
  maxCount = 4
  getCoordinates(location: Location, context: MaterialContext) {
    const base = fjordBoardLocator.getCoordinates(location, context)
    return { x: base.x! - 4, y: base.y! - 14 }
  }
}

export const playerBuildingIdleLayoutLocator = new PlayerBuildingIdleLayoutLocator()
