/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/looot/material/LocationType'
import { ResourceTile } from '@gamepark/looot/material/ResourceTile'
import { CardDescription } from '@gamepark/react-game'
import Wood from '../images/ressources/bois.png'
import Sheep from '../images/ressources/mouton.png'
import Gold from '../images/ressources/or.png'
import Axe from '../images/ressources/haches.png'

export class ResourceTileDescription extends CardDescription {
  height = 2.3
  width = 2.5

  images = images

  stockLocation = { type: LocationType.ResourceTilesPile }
  staticItems = [
    { quantity: 20, location: { ...this.stockLocation, id: ResourceTile.Axe }, id: ResourceTile.Axe },
    { quantity: 20, location: { ...this.stockLocation, id: ResourceTile.Gold }, id: ResourceTile.Gold },
    { quantity: 25, location: { ...this.stockLocation, id: ResourceTile.Sheep }, id: ResourceTile.Sheep },
    { quantity: 25, location: { ...this.stockLocation, id: ResourceTile.Wood }, id: ResourceTile.Wood }
  ]
}

const images = {
  [ResourceTile.Axe]: Axe,
  [ResourceTile.Gold]: Gold,
  [ResourceTile.Sheep]: Sheep,
  [ResourceTile.Wood]: Wood
}

export const resourceTileDescription = new ResourceTileDescription()
