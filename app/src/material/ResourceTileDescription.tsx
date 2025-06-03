/** @jsxImportSource @emotion/react */
import { Resource } from '@gamepark/looot/material/Resource'
import Wood from '../images/ressources/bois.png'
import Axe from '../images/ressources/haches.png'
import Sheep from '../images/ressources/mouton.png'
import Gold from '../images/ressources/or.png'
import { ResourceTileHelp } from './help/ResourceTileHelp'
import { HexagoneDescription } from './HexagoneDescription'

export class ResourceTileDescription extends HexagoneDescription {
  height = 2.5
  width = 2.7

  images = images

  help = ResourceTileHelp
}

const images = {
  [Resource.Wood]: Wood,
  [Resource.Sheep]: Sheep,
  [Resource.Gold]: Gold,
  [Resource.Axe]: Axe
}

export const resourceTileDescription = new ResourceTileDescription()
