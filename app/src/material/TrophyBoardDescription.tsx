/** @jsxImportSource @emotion/react */
import { TrophyBoard } from '@gamepark/looot/material/TrophyBoard'
import TrophyBoard1 from '../images/plateaux/trophee1.png'
import TrophyBoard2 from '../images/plateaux/trophee2.png'
import { TrophyBoardHelp } from './help/TrophyBoardHelp'
import { SideBoardDescription } from './SideBoardDescription'

export class TrophyBoardDescription extends SideBoardDescription {
  images = {
    [TrophyBoard.TrophyBoard1]: TrophyBoard1,
    [TrophyBoard.TrophyBoard2]: TrophyBoard2
  }
  help = TrophyBoardHelp
}

export const trophyBoardDescription = new TrophyBoardDescription()
