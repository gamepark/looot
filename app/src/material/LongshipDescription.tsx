/** @jsxImportSource @emotion/react */
import { Longship } from '@gamepark/looot/material/Longship'
import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Castle1 from '../images/drakkars/chateau1.png'
import Castle2 from '../images/drakkars/chateau2.png'
import Castle3 from '../images/drakkars/chateau3.png'
import Castle4 from '../images/drakkars/chateau4.png'
import CastleBack3 from '../images/drakkars/chateau_back_3.png'
import CastleBack4 from '../images/drakkars/chateau_back_4.png'
import Gold1 from '../images/drakkars/or1.png'
import Gold2 from '../images/drakkars/or2.png'
import Gold3 from '../images/drakkars/or3.png'
import Gold4 from '../images/drakkars/or4.png'
import GoldBack2 from '../images/drakkars/or_back_2.png'
import GoldBack3 from '../images/drakkars/or_back_3.png'
import Watchtower1 from '../images/drakkars/tour1.png'
import Watchtower2 from '../images/drakkars/tour2.png'
import Watchtower3 from '../images/drakkars/tour3.png'
import Watchtower4 from '../images/drakkars/tour4.png'
import Watchtower5 from '../images/drakkars/tour5.png'
import WatchtowerBack1 from '../images/drakkars/tour_back_1.png'
import WatchtowerBack2 from '../images/drakkars/tour_back_2.png'
import Sheep1 from '../images/drakkars/mouton1.png'
import Sheep2 from '../images/drakkars/mouton2.png'
import Sheep3 from '../images/drakkars/mouton3.png'
import Sheep4 from '../images/drakkars/mouton4.png'
import Sheep5 from '../images/drakkars/mouton5.png'
import Sheep6 from '../images/drakkars/mouton6.png'
import SheepBack1 from '../images/drakkars/mouton_back_1.png'
import SheepBack2 from '../images/drakkars/mouton_back_2.png'
import Wood1 from '../images/drakkars/bois1.png'
import Wood2 from '../images/drakkars/bois2.png'
import Wood3 from '../images/drakkars/bois3.png'
import Wood4 from '../images/drakkars/bois4.png'
import Wood5 from '../images/drakkars/bois5.png'
import Wood6 from '../images/drakkars/bois6.png'
import WoodBack1 from '../images/drakkars/bois_back_1.png'
import WoodBack2 from '../images/drakkars/bois_back_2.png'
import House1 from '../images/drakkars/maison1.png'
import House2 from '../images/drakkars/maison2.png'
import House3 from '../images/drakkars/maison3.png'
import House4 from '../images/drakkars/maison4.png'
import House5 from '../images/drakkars/maison5.png'
import HouseBack1 from '../images/drakkars/maison_back_1.png'
import HouseBack2 from '../images/drakkars/maison_back_2.png'
import { LongshipHelp } from './help/LongshipHelp'

export class LongshipDescription extends CardDescription {
  height = 2.9
  width = 3.2

  backImages = backImages
  images = images

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.rotation as boolean
  }

  help = LongshipHelp
}

const backImages = {
  [Longship.Castle31]: CastleBack3,
  [Longship.Castle32]: CastleBack3,
  [Longship.Castle33]: CastleBack3,
  [Longship.Castle41]: CastleBack4,
  [Longship.Gold21]: GoldBack2,
  [Longship.Gold22]: GoldBack2,
  [Longship.Gold23]: GoldBack2,
  [Longship.Gold31]: GoldBack3,
  [Longship.Watchtower11]: WatchtowerBack1,
  [Longship.Watchtower12]: WatchtowerBack1,
  [Longship.Watchtower13]: WatchtowerBack1,
  [Longship.Watchtower21]: WatchtowerBack2,
  [Longship.Watchtower22]: WatchtowerBack2,
  [Longship.Sheep11]: SheepBack1,
  [Longship.Sheep12]: SheepBack1,
  [Longship.Sheep13]: SheepBack1,
  [Longship.Sheep14]: SheepBack1,
  [Longship.Sheep21]: SheepBack2,
  [Longship.Sheep22]: SheepBack2,
  [Longship.Wood11]: WoodBack1,
  [Longship.Wood12]: WoodBack1,
  [Longship.Wood13]: WoodBack1,
  [Longship.Wood14]: WoodBack1,
  [Longship.Wood15]: WoodBack1,
  [Longship.Wood21]: WoodBack2,
  [Longship.House11]: HouseBack1,
  [Longship.House12]: HouseBack1,
  [Longship.House13]: HouseBack1,
  [Longship.House14]: HouseBack1,
  [Longship.House21]: HouseBack2
}

const images = {
  [Longship.Castle31]: Castle1,
  [Longship.Castle32]: Castle2,
  [Longship.Castle33]: Castle3,
  [Longship.Castle41]: Castle4,
  [Longship.Gold21]: Gold1,
  [Longship.Gold22]: Gold2,
  [Longship.Gold23]: Gold3,
  [Longship.Gold31]: Gold4,
  [Longship.Watchtower11]: Watchtower1,
  [Longship.Watchtower12]: Watchtower2,
  [Longship.Watchtower13]: Watchtower3,
  [Longship.Watchtower21]: Watchtower4,
  [Longship.Watchtower22]: Watchtower5,
  [Longship.Sheep11]: Sheep1,
  [Longship.Sheep12]: Sheep2,
  [Longship.Sheep13]: Sheep3,
  [Longship.Sheep14]: Sheep4,
  [Longship.Sheep21]: Sheep5,
  [Longship.Sheep22]: Sheep6,
  [Longship.Wood11]: Wood1,
  [Longship.Wood12]: Wood2,
  [Longship.Wood13]: Wood3,
  [Longship.Wood14]: Wood4,
  [Longship.Wood15]: Wood5,
  [Longship.Wood21]: Wood6,
  [Longship.House11]: House1,
  [Longship.House12]: House2,
  [Longship.House13]: House3,
  [Longship.House14]: House4,
  [Longship.House21]: House5
}

export const longshipDescription = new LongshipDescription()
