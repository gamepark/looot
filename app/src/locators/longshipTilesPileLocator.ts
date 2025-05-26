/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { bagLocator } from './BagLocator'

class LongshipTilesPileLocator extends PileLocator {
  radius = 2
  coordinates = bagLocator.coordinates
}

export const longshipTilesPileLocator = new LongshipTilesPileLocator()
