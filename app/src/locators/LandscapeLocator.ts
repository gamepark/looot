/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { LandscapeHelper } from '@gamepark/looot/rules/helpers/LandscapeHelper'
import { HexagonalGridLocator, ItemContext } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { HexGridSystem, Location, MaterialItem } from '@gamepark/rules-api'

class LandscapeLocator extends HexagonalGridLocator {
  coordinatesSystem = HexGridSystem.EvenQ
  size = 1.92

  getCoordinates(_: Location, { rules }: MaterialContext) {
    const helper = new LandscapeHelper(rules.game)
    const x = -(helper.xMin + helper.xMax) / 2
    const y = -(helper.yMin + helper.yMax) / 2
    return this.getHexagonPosition({ x, y })
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x = 0, y = 0 } = super.getItemCoordinates(item, context)
    const isBoard = context.type === MaterialType.LandscapeBoard || context.type === MaterialType.TrophyBoard || context.type === MaterialType.OceanBoard
    const z = isBoard ? 0 : 0.2
    if (context.type === MaterialType.BuildingTile) {
      return {
        x: x - context.displayIndex * 0.07,
        y: y - context.displayIndex * 0.1,
        z: z + context.displayIndex * 0.1
      }
    }
    return { x, y, z }
  }
}

export const landscapeLocator = new LandscapeLocator()
