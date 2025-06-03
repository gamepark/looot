/** @jsxImportSource @emotion/react */
import { Resource } from '@gamepark/looot/material/Resource'
import { LandscapeHelper } from '@gamepark/looot/rules/helpers/LandscapeHelper'
import { DeckLocator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { range } from 'lodash'
import { landscapeLocator } from './LandscapeLocator'

class ResourceTilesDeckLocator extends DeckLocator {
  limit = 10

  coordinatesCache?: XYCoordinates

  getCoordinates(location: Location, context: MaterialContext) {
    if (!this.coordinatesCache) {
      switch (context.rules.players.length) {
        case 2:
          this.coordinatesCache = { x: -28, y: -13 }
          break
        case 3:
          this.coordinatesCache = { x: 30, y: -13 }
          break
        default: {
          const landscape = new LandscapeHelper(context.rules.game).landscape
          const landscapeSize = landscapeLocator.getLandscapeSize(context.rules.game)
          const yGap = Math.min(2, landscape.grid.length - 11)
          if (yGap <= 0) {
            this.coordinatesCache = { x: -landscapeSize.width / 2 + 3, y: 22 }
            break
          }
          const xRange = range(landscape.xMin, landscape.xMin + 3)
          const bottomLeft = xRange.flatMap((x) => range(landscape.yMax, landscape.yMax - yGap, -1).map((y) => ({ x, y })))
          const deltaX = landscapeSize.width / 2 - 3
          const deltaY = Math.max(landscapeSize.height / 2 - (yGap - 1) * Math.sqrt(3) * landscapeLocator.size, 22)
          if (bottomLeft.every((hex) => landscape.getValue(hex) === undefined)) {
            this.coordinatesCache = { x: -deltaX, y: deltaY }
            break
          }
          const topLeft = xRange.flatMap((x) => range(landscape.yMin, landscape.yMin + yGap).map((y) => ({ x, y })))
          if (topLeft.every((hex) => landscape.getValue(hex) === undefined)) {
            this.coordinatesCache = { x: -deltaX, y: -deltaY }
            break
          }
          this.coordinatesCache = { x: deltaX, y: -deltaY }
        }
      }
    }
    const { x, y } = this.coordinatesCache
    const firstLine = location.id === Resource.Wood || location.id === Resource.Sheep
    const firstColumn = location.id === Resource.Wood || location.id === Resource.Gold
    return { x: x + (firstColumn ? -1.6 : 1.6), y: y + (firstLine ? -1.6 : 1.6) }
  }
}

export const resourceTilesDeckLocator = new ResourceTilesDeckLocator()
