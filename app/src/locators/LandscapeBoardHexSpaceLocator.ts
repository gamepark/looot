/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { HexagonalGridLocator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { HexGridSystem, Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'

class LandscapeBoardHexSpaceLocator extends HexagonalGridLocator {
  parentItemType = MaterialType.LandscapeBoard
  coordinatesSystem = HexGridSystem.EvenQ
  size = { x: 1.74, y: 1.75 }

  getRotateZ(): number {
    return 0
  }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).index(location.parent).getItem()
  }

  getPositionOnParent(_location: Location<number, number>, _context: MaterialContext<number, number, number>): XYCoordinates {
    return {x: 9, y: 17.5}
  }
}

export const landscapeBoardHexSpaceLocator = new LandscapeBoardHexSpaceLocator()
