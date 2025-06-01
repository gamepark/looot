/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import BlueViking from '../images/meeples/bleu.png'
import RedViking from '../images/meeples/rouge.png'
import GreyViking from '../images/meeples/gris.png'
import YellowViking from '../images/meeples/jaune.png'
import { VikingHelp } from './help/VikingHelp'

export class VikingDescription extends TokenDescription {
  height = 1.9
  width = 1.79

  images = {
    [PlayerColor.Blue]: BlueViking,
    [PlayerColor.Red]: RedViking,
    [PlayerColor.Grey]: GreyViking,
    [PlayerColor.Yellow]: YellowViking
  }

  help = VikingHelp

  getFrontExtraCss(): Interpolation<Theme> {
    return css`
      clip-path: polygon(
        40% 4%,
        60% 14%,
        66% 22%,
        71% 22%,
        73% 14%,
        91% 23%,
        98% 35%,
        98% 46%,
        84% 55%,
        84% 75%,
        78% 75%,
        68% 66%,
        72% 80%,
        69% 80%,
        69% 91%,
        38% 95%,
        24% 87%,
        24% 79%,
        8% 68%,
        5% 59%,
        6% 52%,
        14% 42%,
        25% 38%,
        32% 32%,
        30% 22%,
        34% 12%
      );
    `
  }
}

export const vikingDescription = new VikingDescription()
