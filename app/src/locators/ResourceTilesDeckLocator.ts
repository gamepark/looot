/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class ResourceTilesDeckLocator extends DeckLocator {
  getCoordinates(location: Location): Partial<Coordinates> {
    const baseX = -5
    return { x: baseX + 3.2 * location.id, y: 18 }
  }
}

export const resourceTilesDeckLocator = new ResourceTilesDeckLocator()
