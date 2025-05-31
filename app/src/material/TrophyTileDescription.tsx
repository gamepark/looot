/** @jsxImportSource @emotion/react */
import { Trophy } from '@gamepark/looot/material/Trophy'
import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Trophy2 from '../images/trophees/trophee2.png'
import Trophy3 from '../images/trophees/trophee3.png'
import Trophy4 from '../images/trophees/trophee4.png'
import Trophy5 from '../images/trophees/trophee5.png'
import Trophy6 from '../images/trophees/trophee6.png'
import Back2 from '../images/trophees/back2.png'
import Back3 from '../images/trophees/back3.png'
import Back4 from '../images/trophees/back4.png'
import Back5 from '../images/trophees/back5.png'
import Back6 from '../images/trophees/back6.png'

export class TrophyTileDescription extends CardDescription {
  height = 2.7
  width = 3

  backImages = backImages
  images = images

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.rotation as boolean
  }
}

const backImages = {
  [Trophy.Trophy2]: Back2,
  [Trophy.Trophy3]: Back3,
  [Trophy.Trophy4]: Back4,
  [Trophy.Trophy5]: Back5,
  [Trophy.Trophy6]: Back6
}

const images = {
  [Trophy.Trophy2]: Trophy2,
  [Trophy.Trophy3]: Trophy3,
  [Trophy.Trophy4]: Trophy4,
  [Trophy.Trophy5]: Trophy5,
  [Trophy.Trophy6]: Trophy6
}

export const trophyTileDescription = new TrophyTileDescription()
