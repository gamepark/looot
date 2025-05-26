/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'

class ResourceTilesPileLocator extends PileLocator {
  radius = 2
  coordinates = { x: -5, y: 18 }
}

export const resourceTilesPileLocator = new ResourceTilesPileLocator()
