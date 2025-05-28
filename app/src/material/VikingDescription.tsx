/** @jsxImportSource @emotion/react */
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import BlueViking from '../images/meeples/bleu.png'
import RedViking from '../images/meeples/rouge.png'
import GreyViking from '../images/meeples/gris.png'
import YellowViking from '../images/meeples/jaune.png'

export class VikingDescription extends TokenDescription {
  height = 1.9
  width = 1.79

  images = {
    [PlayerColor.Blue]: BlueViking,
    [PlayerColor.Red]: RedViking,
    [PlayerColor.Grey]: GreyViking,
    [PlayerColor.Yellow]: YellowViking
  }
}

export const vikingDescription = new VikingDescription()
