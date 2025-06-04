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

  getCoordinates(_: Location, context: MaterialContext) {
    const landscape = new LandscapeHelper(context.rules.game).landscape
    const { xMin, xMax, yMin, yMax } = this.getBoundaries(landscape)
    return { x: -(xMin + xMax) / 2, y: -(yMin + yMax) / 2 }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x = 0, y = 0 } = super.getItemCoordinates(item, context)
    const isBoard = context.type === MaterialType.LandscapeBoard || context.type === MaterialType.TrophyBoard || context.type === MaterialType.OceanBoard
    const z = isBoard ? 0 : (item.location.z ?? 0)
    if (context.type === MaterialType.Viking) {
      return {
        x: x - 0.3 + z * 0.7,
        y: y - 0.3 + z * 0.7,
        z: z
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
    const landscape = new LandscapeHelper(game).landscape
    const { xMin, xMax, yMin, yMax } = this.getBoundaries(landscape)
    return { width: xMax - xMin, height: yMax - yMin }
  }

  locationDescription = new LandscapeHexDropDescription()

  getHoverTransform = (item: MaterialItem, context: ItemContext) => {
    if (context.type === MaterialType.Longship) {
      const translateZ = item.location.rotation ? 'translateZ(-10em)' : 'translateZ(10em)'
      return [translateZ, 'scale(3.5)']
    }
    return []
  }
}

class LandscapeHexDropDescription extends DropAreaDescription {
  width = 3
  height = 2.6
  extraCss = css`
    aspect-ratio: 1 / cos(30deg);
    clip-path: polygon(50% -50%, 100% 50%, 50% 150%, 0 50%);
  `
}

export const landscapeLocator = new LandscapeLocator()
