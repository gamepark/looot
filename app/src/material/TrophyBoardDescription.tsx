/** @jsxImportSource @emotion/react */
import Front from '../images/plateaux/trophee1.png'
import Back from '../images/plateaux/trophee2.png'
import { TrophyBoardHelp } from './help/TrophyBoardHelp'
import { SideBoardDescription } from './SideBoardDescription'

export class TrophyBoardDescription extends SideBoardDescription {
  backImage = Back
  image = Front
  help = TrophyBoardHelp
}

export const trophyBoardDescription = new TrophyBoardDescription()
