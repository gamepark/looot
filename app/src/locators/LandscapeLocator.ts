/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { LandscapeHelper } from '@gamepark/looot/rules/helpers/LandscapeHelper'
import { HexagonalGridLocator, ItemContext } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { HexGridSystem, Location, MaterialGame, MaterialItem } from '@gamepark/rules-api'

class LandscapeLocator extends HexagonalGridLocator {
  coordinatesSystem = HexGridSystem.EvenQ
  size = 1.92

  getCoordinates(_: Location, { rules }: MaterialContext) {
    const { xMin, xMax, yMin, yMax } = new LandscapeHelper(rules.game)
    return { x: -(xMax + xMin - 1) * 0.75 * this.size, y: -(yMax + yMin - 2) * (Math.sqrt(3) / 2) * this.size }
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

  getLandscapeSize(game: MaterialGame) {
    const helper = new LandscapeHelper(game)
    const { x: xMin, y: yMin } = this.getHexagonPosition({ x: helper.xMin, y: helper.yMin })
    const { x: xMax, y: yMax } = this.getHexagonPosition({ x: helper.xMax, y: helper.yMax })
    return { width: xMax - xMin, height: yMax - yMin }
  }
}

export const landscapeLocator = new LandscapeLocator()
