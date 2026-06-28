import { Water } from '@gamepark/looot/material/LandscapeBoard'
import { Resource } from '@gamepark/looot/material/Resource'
import { LandscapeHelper } from '@gamepark/looot/rules/helpers/LandscapeHelper'
import { Locator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { HexGridSystem, Location, Polyhex, XYCoordinates } from '@gamepark/rules-api'
import { landscapeLocator } from './LandscapeLocator'
import { resourceTilesDeckLocator } from './ResourceTilesDeckLocator'

class ScorePadPlaceLocator extends Locator {
  getCoordinates(_: Location, context: MaterialContext) {
    if (context.rules.players.length === 4) {
      return this.get4PlayersCoordinates(context)
    }
    return context.rules.players.length === 2 ? { x: 40, y: -12.5 } : { x: -35, y: -18 }
  }

  coordinatesCache?: XYCoordinates

  get4PlayersCoordinates(context: MaterialContext) {
    if (!this.coordinatesCache) {
      const landscape = this.getLandscapeWithResourcePiles(context)
      const landscapeSize = landscapeLocator.getLandscapeSize(context.rules.game)
      const deltaX = landscapeSize.width / 2 - 4
      const deltaY = Math.max(landscapeSize.height / 2, 25) - 5
      this.coordinatesCache = { x: deltaX, y: -deltaY }
      const topRightDistance = landscape.getDistance({ x: landscape.xMax, y: landscape.yMin })
      const topLeftDistance = landscape.getDistance({ x: landscape.xMin, y: landscape.yMin })
      const bottomRightDistance = landscape.getDistance({ x: landscape.xMax, y: landscape.yMax })
      const bottomLeftDistance = landscape.getDistance({ x: landscape.xMin, y: landscape.yMax })
      const best = Math.max(topRightDistance, topLeftDistance, bottomRightDistance, bottomLeftDistance)
      if (topRightDistance === best) {
        this.coordinatesCache = { x: deltaX, y: -deltaY }
      } else if (topLeftDistance === best) {
        this.coordinatesCache = { x: -deltaX, y: -deltaY }
      } else if (bottomRightDistance === best) {
        this.coordinatesCache = { x: deltaX, y: deltaY }
      } else {
        this.coordinatesCache = { x: -deltaX, y: deltaY }
      }
    }
    return this.coordinatesCache
  }

  getLandscapeWithResourcePiles(context: MaterialContext) {
    const landscape = new LandscapeHelper(context.rules.game).landscape
    while (landscape.grid.length < 13) {
      landscape.yMin--
      landscape.grid.unshift([])
      landscape.grid.push([])
    }
    const resourcesCoordinates = resourceTilesDeckLocator.get4PlayersResourceCoordinates(context)
    const waterPolyhex = new Polyhex([[Water]], { system: HexGridSystem.EvenQ })
    landscape.merge(waterPolyhex, resourcesCoordinates[Resource.Wood])
    landscape.merge(waterPolyhex, resourcesCoordinates[Resource.Sheep])
    landscape.merge(waterPolyhex, resourcesCoordinates[Resource.Axe])
    landscape.merge(waterPolyhex, resourcesCoordinates[Resource.Gold])
    return landscape
  }
}

export const scorePadPlaceLocator = new ScorePadPlaceLocator()
