/** @jsxImportSource @emotion/react */
import { LandscapeHelper } from '@gamepark/looot/rules/helpers/LandscapeHelper'
import { Locator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { range } from 'lodash'
import { landscapeLocator } from './LandscapeLocator'

class BagLocator extends Locator {
  coordinatesCache?: XYCoordinates

  getCoordinates(_: Location, context: MaterialContext) {
    if (this.coordinatesCache) return this.coordinatesCache
    switch (context.rules.players.length) {
      case 2:
        this.coordinatesCache = { x: 28, y: -13 }
        break
      case 3:
        this.coordinatesCache = { x: -40, y: -5 }
        break
      default: {
        const landscape = new LandscapeHelper(context.rules.game).landscape
        const landscapeSize = landscapeLocator.getLandscapeSize(context.rules.game)
        const yGap = Math.min(4, landscape.grid.length - 11)
        if (yGap <= 0) {
          this.coordinatesCache = { x: landscapeSize.width / 2 - 4, y: 20 }
          break
        }
        const xRange = range(landscape.xMax, landscape.xMax - 3, -1)
        const bottomRight = xRange.flatMap((x) => range(landscape.yMax, landscape.yMax - yGap, -1).map((y) => ({ x, y })))
        const deltaX = landscapeSize.width / 2 - 3
        const deltaY = Math.max(landscapeSize.height / 2, 25) - 4
        if (bottomRight.every((hex) => landscape.getValue(hex) === undefined)) {
          this.coordinatesCache = { x: deltaX, y: deltaY }
          break
        }
        const topRight = xRange.flatMap((x) => range(landscape.yMin, landscape.yMin + yGap).map((y) => ({ x, y })))
        if (topRight.every((hex) => landscape.getValue(hex) === undefined)) {
          this.coordinatesCache = { x: deltaX, y: -deltaY }
          break
        }
        this.coordinatesCache = { x: -deltaX, y: -deltaY }
      }
    }
    return this.coordinatesCache
  }
}

export const bagLocator = new BagLocator()
