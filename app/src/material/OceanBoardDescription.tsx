/** @jsxImportSource @emotion/react */
import { BoardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Front from '../images/plateaux/mer1.png'
import Back from '../images/plateaux/mer2.png'

export class OceanBoardDescription extends BoardDescription {
  height = 6
  width = 13.7

  backImage = Back

  image = Front

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.rotation as boolean
  }
}

export const oceanBoardDescription = new OceanBoardDescription()
