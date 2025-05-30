/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/looot/material/LocationType'
import { Resource } from '@gamepark/looot/material/Resource'
import Wood from '../images/ressources/bois.png'
import Axe from '../images/ressources/haches.png'
import Sheep from '../images/ressources/mouton.png'
import Gold from '../images/ressources/or.png'
import { HexagoneDescription } from './HexagoneDescription'

export class ResourceTileDescription extends HexagoneDescription {
  height = 2.3
  width = 2.5

  images = images

  stockLocation = { type: LocationType.ResourceTilesPile }
  staticItems = [
    { quantity: 20, location: { ...this.stockLocation, id: Resource.Axe }, id: Resource.Axe },
    { quantity: 20, location: { ...this.stockLocation, id: Resource.Gold }, id: Resource.Gold },
    { quantity: 25, location: { ...this.stockLocation, id: Resource.Sheep }, id: Resource.Sheep },
    { quantity: 25, location: { ...this.stockLocation, id: Resource.Wood }, id: Resource.Wood }
  ]
}

const images = {
  [Resource.Wood]: Wood,
  [Resource.Sheep]: Sheep,
  [Resource.Gold]: Gold,
  [Resource.Axe]: Axe
}

export const resourceTileDescription = new ResourceTileDescription()
