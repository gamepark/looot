/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { bagLocator } from './BagLocator'

class LongshipsPileLocator extends PileLocator {
  radius = 2
  coordinates = bagLocator.coordinates
}

export const longshipsPileLocator = new LongshipsPileLocator()
