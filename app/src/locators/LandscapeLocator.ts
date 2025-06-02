/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { LandscapeHelper } from '@gamepark/looot/rules/helpers/LandscapeHelper'
import { DropAreaDescription, HexagonalGridLocator, ItemContext } from '@gamepark/react-game'
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
    if (context.type === MaterialType.Viking) {
      return {
        x: x - 0.3 + context.displayIndex * 0.7,
        y: y - 0.3 + context.displayIndex * 0.7,
        z: z + context.displayIndex * 0.1
      }
    }
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

  locationDescription = new LandscapeHexDropDescription()
}

class LandscapeHexDropDescription extends DropAreaDescription {
  width = 2.6
  height = 2.2
  extraCss = css`
    aspect-ratio: 1 / cos(30deg);
    clip-path: polygon(50% -50%, 100% 50%, 50% 150%, 0 50%);
  `
}

export const landscapeLocator = new LandscapeLocator()
