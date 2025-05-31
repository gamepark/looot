/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/looot/material/LocationType'
import { BoardDescription } from '@gamepark/react-game'
import Bag from '../images/bag.png'

export class BagDescription extends BoardDescription {
  height = 9
  width = 8

  image = Bag

  staticItem = { location: { type: LocationType.Bag } }
}

export const bagDescription = new BagDescription()
