/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { HexagonalGridLocator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { HexGridSystem, Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'

class OceanBoardHexSpaceLocator extends HexagonalGridLocator {
  parentItemType = MaterialType.OceanBoard
  coordinatesSystem = HexGridSystem.EvenQ
  size = { x: 1.93, y: 1.94 }

  getRotateZ(): number {
    return 0
  }

  getParentItem(_: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).getItem()
  }

  getPositionOnParent(_location: Location<number, number>, _context: MaterialContext<number, number, number>): XYCoordinates {
    return {x: 12, y: 50}
  }
}

export const oceanBoardHexSpaceLocator = new OceanBoardHexSpaceLocator()
