/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { HexagonalGridLocator, ItemContext } from '@gamepark/react-game'
import { HexGridSystem, MaterialItem } from '@gamepark/rules-api'

class LandscapeLocator extends HexagonalGridLocator {
  coordinatesSystem = HexGridSystem.EvenQ
  size = 1.92

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x = 0, y = 0 } = super.getItemCoordinates(item, context)
    const isBoard = context.type === MaterialType.LandscapeBoard || context.type === MaterialType.TrophyBoard || context.type === MaterialType.OceanBoard
    const z = isBoard ? 0 : 0.2
    if (context.type === MaterialType.BuildingTile) {
      return {
        x: x - context.displayIndex * 0.07,
        y: y - context.displayIndex * 0.1,
        z: z + context.displayIndex * 0.1,
      }
    }
    return { x, y, z }
  }
}

export const landscapeLocator = new LandscapeLocator()
