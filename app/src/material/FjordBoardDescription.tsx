/** @jsxImportSource @emotion/react */
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { BoardDescription } from '@gamepark/react-game'
import BlueFjord from '../images/plateaux/fjord_bleu.jpg'
import RedFjord from '../images/plateaux/fjord_rouge.jpg'
import GreyFjord from '../images/plateaux/fjord_gris.jpg'
import YellowFjord from '../images/plateaux/fjord_jaune.jpg'
import { FjordBoardHelp } from './help/FjordBoardHelp'

export class FjordBoardDescription extends BoardDescription {
  height = 24
  width = 24
  borderRadius = 0.8

  images = {
    [PlayerColor.Blue]: BlueFjord,
    [PlayerColor.Red]: RedFjord,
    [PlayerColor.Grey]: GreyFjord,
    [PlayerColor.Yellow]: YellowFjord
  }

  help = FjordBoardHelp
}

export const fjordBoardDescription = new FjordBoardDescription()
