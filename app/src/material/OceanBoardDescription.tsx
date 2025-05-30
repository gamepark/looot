/** @jsxImportSource @emotion/react */
import { OceanBoard } from '@gamepark/looot/material/OceanBoard'
import OceanBoard1 from '../images/plateaux/mer1.png'
import OceanBoard2 from '../images/plateaux/mer2.png'
import { SideBoardDescription } from './SideBoardDescription'

export class OceanBoardDescription extends SideBoardDescription {
  images = {
    [OceanBoard.OceanBoard1]: OceanBoard1,
    [OceanBoard.OceanBoard2]: OceanBoard2
  }
}

export const oceanBoardDescription = new OceanBoardDescription()
