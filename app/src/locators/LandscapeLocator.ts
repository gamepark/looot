/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { HexagonalGridLocator, ItemContext } from '@gamepark/react-game'
import { HexGridSystem, MaterialItem } from '@gamepark/rules-api'

class LandscapeLocator extends HexagonalGridLocator {
  coordinatesSystem = HexGridSystem.EvenQ
  size = 1.92

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y } = super.getItemCoordinates(item, context)
    return { x, y, z: context.type === MaterialType.BuildingTile ? 0.2 : 0 }
  }
}

export const landscapeLocator = new LandscapeLocator()
