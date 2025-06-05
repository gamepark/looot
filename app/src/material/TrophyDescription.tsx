/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/looot/material/LocationType'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { Trophy } from '@gamepark/looot/material/Trophy'
import { ItemContext } from '@gamepark/react-game/dist/locators/Locator'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import Back2 from '../images/trophees/back2.png'
import Back3 from '../images/trophees/back3.png'
import Back4 from '../images/trophees/back4.png'
import Back5 from '../images/trophees/back5.png'
import Back6 from '../images/trophees/back6.png'
import Trophy2 from '../images/trophees/trophee2.png'
import Trophy3 from '../images/trophees/trophee3.png'
import Trophy4 from '../images/trophees/trophee4.png'
import Trophy5 from '../images/trophees/trophee5.png'
import Trophy6 from '../images/trophees/trophee6.png'
import { TrophyHelp } from './help/TrophyHelp'
import { HexagoneDescription } from './HexagoneDescription'

export class TrophyDescription extends HexagoneDescription {
  height = 2.9
  width = 3.2

  images = images
  backImages = backImages

  isFlipped(item: Partial<MaterialItem>) {
    return item.location?.type === LocationType.FjordBoardHexSpace
  }

  help = TrophyHelp

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.Trophy)(move) && move.location.type === LocationType.FjordBoardHexSpace && move.itemIndex === context.index
  }
}

const images = {
  [Trophy.Trophy2]: Back2,
  [Trophy.Trophy3]: Back3,
  [Trophy.Trophy4]: Back4,
  [Trophy.Trophy5]: Back5,
  [Trophy.Trophy6]: Back6
}

const backImages = {
  [Trophy.Trophy2]: Trophy2,
  [Trophy.Trophy3]: Trophy3,
  [Trophy.Trophy4]: Trophy4,
  [Trophy.Trophy5]: Trophy5,
  [Trophy.Trophy6]: Trophy6
}

export const trophyDescription = new TrophyDescription()
