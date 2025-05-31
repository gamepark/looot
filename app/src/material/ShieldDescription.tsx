/** @jsxImportSource @emotion/react */
import { Shield } from '@gamepark/looot/material/Shield'
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import PlayAgainBlue from '../images/boucliers/bleu1.jpg'
import DoubleGainBlue from '../images/boucliers/bleu2.jpg'
import PlaceOnOccupiedSpaceBlue from '../images/boucliers/bleu3.jpg'
import BackBlue from '../images/boucliers/bleu_back.jpg'
import PlayAgainGrey from '../images/boucliers/gris1.jpg'
import DoubleGainGrey from '../images/boucliers/gris2.jpg'
import PlaceOnOccupiedSpaceGrey from '../images/boucliers/gris3.jpg'
import BackGrey from '../images/boucliers/gris_back.jpg'
import PlayAgainYellow from '../images/boucliers/jaune1.jpg'
import DoubleGainYellow from '../images/boucliers/jaune2.jpg'
import PlaceOnOccupiedSpaceYellow from '../images/boucliers/jaune3.jpg'
import BackYellow from '../images/boucliers/jaune_back.jpg'
import PlayAgainRed from '../images/boucliers/rouge1.jpg'
import DoubleGainRed from '../images/boucliers/rouge2.jpg'
import PlaceOnOccupiedSpaceRed from '../images/boucliers/rouge3.jpg'
import BackRed from '../images/boucliers/rouge_back.jpg'

export class ShieldDescription extends TokenDescription {
  height = 2.8
  width = 2.8
  borderRadius = 1.4

  images = images
  backImages = backImages

  protected getBackId(itemId: number) {
    return Math.floor(itemId / 10)
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
  [PlayerColor.Blue * 10 + Shield.PlayAgain]: PlayAgainBlue,
  [PlayerColor.Blue * 10 + Shield.DoubleGain]: DoubleGainBlue,
  [PlayerColor.Blue * 10 + Shield.PlaceOnOccupiedSpace]: PlaceOnOccupiedSpaceBlue,
  [PlayerColor.Red * 10 + Shield.PlayAgain]: PlayAgainRed,
  [PlayerColor.Red * 10 + Shield.DoubleGain]: DoubleGainRed,
  [PlayerColor.Red * 10 + Shield.PlaceOnOccupiedSpace]: PlaceOnOccupiedSpaceRed,
  [PlayerColor.Grey * 10 + Shield.PlayAgain]: PlayAgainGrey,
  [PlayerColor.Grey * 10 + Shield.DoubleGain]: DoubleGainGrey,
  [PlayerColor.Grey * 10 + Shield.PlaceOnOccupiedSpace]: PlaceOnOccupiedSpaceGrey,
  [PlayerColor.Yellow * 10 + Shield.PlayAgain]: PlayAgainYellow,
  [PlayerColor.Yellow * 10 + Shield.DoubleGain]: DoubleGainYellow,
  [PlayerColor.Yellow * 10 + Shield.PlaceOnOccupiedSpace]: PlaceOnOccupiedSpaceYellow
}

export const shieldDescription = new ShieldDescription()
