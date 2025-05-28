/** @jsxImportSource @emotion/react */
import { getShieldType, Shield } from '@gamepark/looot/material/Shield'
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import PlayAgainBlue from '../images/boucliers/bleu1.png'
import DoubleGainBlue from '../images/boucliers/bleu2.png'
import PlaceOnOccupiedSpaceBlue from '../images/boucliers/bleu3.png'
import BackBlue from '../images/boucliers/bleu_back.png'
import PlayAgainRed from '../images/boucliers/rouge1.png'
import DoubleGainRed from '../images/boucliers/rouge2.png'
import PlaceOnOccupiedSpaceRed from '../images/boucliers/rouge3.png'
import BackRed from '../images/boucliers/rouge_back.png'
import PlayAgainGrey from '../images/boucliers/gris1.png'
import DoubleGainGrey from '../images/boucliers/gris2.png'
import PlaceOnOccupiedSpaceGrey from '../images/boucliers/gris3.png'
import BackGrey from '../images/boucliers/gris_back.png'
import PlayAgainYellow from '../images/boucliers/jaune1.png'
import DoubleGainYellow from '../images/boucliers/jaune2.png'
import PlaceOnOccupiedSpaceYellow from '../images/boucliers/jaune3.png'
import BackYellow from '../images/boucliers/jaune_back.png'

export class ShieldDescription extends CardDescription {
  height = 2.8
  width = 2.8

  getBackImage(itemId: number): string | undefined {
    const playerColor: PlayerColor = Math.floor(itemId / 10) as PlayerColor
    return backImages[playerColor]
  }

  getImage(itemId: number): string | undefined {
    const playerColor: PlayerColor = Math.floor(itemId / 10) as PlayerColor
    const shieldType: Shield = getShieldType(itemId)
    return images[playerColor][shieldType]
  }

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.rotation as boolean
  }
}

const backImages = {
  [PlayerColor.Blue]: BackBlue,
  [PlayerColor.Red]: BackRed,
  [PlayerColor.Grey]: BackGrey,
  [PlayerColor.Yellow]: BackYellow
}

const images = {
  [PlayerColor.Blue]: {
    [Shield.PlayAgain]: PlayAgainBlue,
    [Shield.DoubleGain]: DoubleGainBlue,
    [Shield.PlaceOnOccupiedSpace]: PlaceOnOccupiedSpaceBlue
  },
  [PlayerColor.Red]: {
    [Shield.PlayAgain]: PlayAgainRed,
    [Shield.DoubleGain]: DoubleGainRed,
    [Shield.PlaceOnOccupiedSpace]: PlaceOnOccupiedSpaceRed
  },
  [PlayerColor.Grey]: {
    [Shield.PlayAgain]: PlayAgainGrey,
    [Shield.DoubleGain]: DoubleGainGrey,
    [Shield.PlaceOnOccupiedSpace]: PlaceOnOccupiedSpaceGrey
  },
  [PlayerColor.Yellow]: {
    [Shield.PlayAgain]: PlayAgainYellow,
    [Shield.DoubleGain]: DoubleGainYellow,
    [Shield.PlaceOnOccupiedSpace]: PlaceOnOccupiedSpaceYellow
  }
}

export const shieldDescription = new ShieldDescription()
