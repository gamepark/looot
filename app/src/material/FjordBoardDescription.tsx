/** @jsxImportSource @emotion/react */
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { BoardDescription } from '@gamepark/react-game'
import BlueFjord from '../images/plateaux/fjord_bleu.png'
import RedFjord from '../images/plateaux/fjord_rouge.png'
import GreyFjord from '../images/plateaux/fjord_gris.png'
import YellowFjord from '../images/plateaux/fjord_jaune.png'
import { FjordBoardHelp } from './help/FjordBoardHelp'

export class FjordBoardDescription extends BoardDescription {
  height = 24
  width = 24

  images = {
    [PlayerColor.Blue]: BlueFjord,
    [PlayerColor.Red]: RedFjord,
    [PlayerColor.Grey]: GreyFjord,
    [PlayerColor.Yellow]: YellowFjord
  }

  help = FjordBoardHelp
}

export const fjordBoardDescription = new FjordBoardDescription()
