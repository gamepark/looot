/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/looot/material/LocationType'
import { Resource } from '@gamepark/looot/material/Resource'
import { LandscapeHelper } from '@gamepark/looot/rules/helpers/LandscapeHelper'
import { DeckLocator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { range } from 'lodash'
import { landscapeLocator } from './LandscapeLocator'

class ResourceTilesDeckLocator extends DeckLocator {
  limit = 10

  getCoordinates(location: Location, context: MaterialContext) {
    if (context.rules.players.length === 4) {
      return this.get4PlayersCoordinates(location, context)
    }
    const { x, y } = context.rules.players.length === 2 ? { x: -28, y: -13 } : { x: -30, y: -5 }
    const firstLine = location.id === Resource.Wood || location.id === Resource.Sheep
    const firstColumn = location.id === Resource.Wood || location.id === Resource.Gold
    return { x: x + (firstColumn ? -1.6 : 1.6), y: y + (firstLine ? -1.6 : 1.6) }
  }

  get4PlayersCoordinates(location: Location, context: MaterialContext) {
    const coordinates = this.get4PlayersResourceCoordinates(context)
    return landscapeLocator.getLocationCoordinates({ type: LocationType.Landscape, ...coordinates[location.id as Resource] }, context)
  }

  coordinatesCache?: Record<Resource, XYCoordinates>

  get4PlayersResourceCoordinates(context: MaterialContext) {
    if (!this.coordinatesCache) {
      const landscape = new LandscapeHelper(context.rules.game).landscape
      while (landscape.grid.length < 13) {
        landscape.yMin--
        landscape.grid.unshift([])
        landscape.grid.push([])
      }
      if (range(landscape.yMax - 4, landscape.yMax + 1).every((y) => !landscape.getValue({ x: landscape.xMin, y }))) {
        this.coordinatesCache = {
          [Resource.Wood]: { x: landscape.xMin, y: landscape.yMax - 3 },
          [Resource.Sheep]: { x: landscape.xMin, y: landscape.yMax - 2 },
          [Resource.Axe]: { x: landscape.xMin, y: landscape.yMax - 1 },
          [Resource.Gold]: { x: landscape.xMin, y: landscape.yMax }
        }
      } else if (range(landscape.xMin, landscape.xMin + 4).every((x) => !landscape.getValue({ x, y: landscape.yMax }))) {
        this.coordinatesCache = {
          [Resource.Wood]: { x: landscape.xMin, y: landscape.yMax },
          [Resource.Sheep]: { x: landscape.xMin + 1, y: landscape.yMax },
          [Resource.Axe]: { x: landscape.xMin + 2, y: landscape.yMax },
          [Resource.Gold]: { x: landscape.xMin + 3, y: landscape.yMax }
        }
      } else if (range(landscape.yMin, landscape.yMin + 4).every((y) => !landscape.getValue({ x: landscape.xMin, y }))) {
        this.coordinatesCache = {
          [Resource.Wood]: { x: landscape.xMin, y: landscape.yMin },
          [Resource.Sheep]: { x: landscape.xMin, y: landscape.yMin + 1 },
          [Resource.Axe]: { x: landscape.xMin, y: landscape.yMin + 2 },
          [Resource.Gold]: { x: landscape.xMin, y: landscape.yMin + 3 }
        }
      } else if (range(landscape.xMin, landscape.xMin + 4).every((x) => !landscape.getValue({ x, y: landscape.yMin }))) {
        this.coordinatesCache = {
          [Resource.Wood]: { x: landscape.xMin, y: landscape.yMin },
          [Resource.Sheep]: { x: landscape.xMin + 1, y: landscape.yMin },
          [Resource.Axe]: { x: landscape.xMin + 2, y: landscape.yMin },
          [Resource.Gold]: { x: landscape.xMin + 3, y: landscape.yMin }
        }
      } else if (range(landscape.yMin, landscape.yMin + 4).every((y) => !landscape.getValue({ x: landscape.xMax, y }))) {
        this.coordinatesCache = {
          [Resource.Wood]: { x: landscape.xMax, y: landscape.yMin },
          [Resource.Sheep]: { x: landscape.xMax, y: landscape.yMin + 1 },
          [Resource.Axe]: { x: landscape.xMax, y: landscape.yMin + 2 },
          [Resource.Gold]: { x: landscape.xMax, y: landscape.yMin + 3 }
        }
      } else {
        this.coordinatesCache = {
          [Resource.Wood]: { x: landscape.xMax - 3, y: landscape.yMin },
          [Resource.Sheep]: { x: landscape.xMax - 2, y: landscape.yMin },
          [Resource.Axe]: { x: landscape.xMax - 1, y: landscape.yMin },
          [Resource.Gold]: { x: landscape.xMax, y: landscape.yMin }
        }
      }
    }
    return this.coordinatesCache
  }
}

export const resourceTilesDeckLocator = new ResourceTilesDeckLocator()
