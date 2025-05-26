/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { HexagonalGridLocator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { HexGridSystem, Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'

class FjordBoardHexSpaceLocator extends HexagonalGridLocator {
  parentItemType = MaterialType.FjordBoard
  coordinatesSystem = HexGridSystem.EvenQ
  size = { x: 1.76, y: 1.73 }

  getRotateZ(): number {
    return 0
  }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  getPositionOnParent(_location: Location, _context: MaterialContext): XYCoordinates {
    return {x: 17.5, y: 18}
  }
}

export const fjordBoardHexSpaceLocator = new FjordBoardHexSpaceLocator()
