/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/looot/material/LocationType'
import { BoardDescription } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { MaterialItem } from '@gamepark/rules-api'
import Bag from '../images/bag.png'

export class BagDescription extends BoardDescription {
  height = 9
  width = 8

  image = Bag

  getStaticItems(context: MaterialContext): MaterialItem[] {
    if (context.rules.players.length === 4) return []
    return [{ location: { type: LocationType.Bag } }]
  }
}

export const bagDescription = new BagDescription()
