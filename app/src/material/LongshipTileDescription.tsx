/** @jsxImportSource @emotion/react */
import { LongshipTile } from '@gamepark/looot/material/LongshipTile'
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

export class LongshipTileDescription extends CardDescription {
  height = 2.6
  width = 2.8

  backImages = backImages
  images = images

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.rotation as boolean
  }
}

const backImages = {
  [LongshipTile.Castle31]: CastleBack3,
  [LongshipTile.Castle32]: CastleBack3,
  [LongshipTile.Castle33]: CastleBack3,
  [LongshipTile.Castle41]: CastleBack4,
  [LongshipTile.Gold21]: GoldBack2,
  [LongshipTile.Gold22]: GoldBack2,
  [LongshipTile.Gold23]: GoldBack2,
  [LongshipTile.Gold31]: GoldBack3,
  [LongshipTile.Watchtower11]: WatchtowerBack1,
  [LongshipTile.Watchtower12]: WatchtowerBack1,
  [LongshipTile.Watchtower13]: WatchtowerBack1,
  [LongshipTile.Watchtower21]: WatchtowerBack2,
  [LongshipTile.Watchtower22]: WatchtowerBack2,
  [LongshipTile.Sheep11]: SheepBack1,
  [LongshipTile.Sheep12]: SheepBack1,
  [LongshipTile.Sheep13]: SheepBack1,
  [LongshipTile.Sheep14]: SheepBack1,
  [LongshipTile.Sheep21]: SheepBack2,
  [LongshipTile.Sheep22]: SheepBack2,
  [LongshipTile.Wood11]: WoodBack1,
  [LongshipTile.Wood12]: WoodBack1,
  [LongshipTile.Wood13]: WoodBack1,
  [LongshipTile.Wood14]: WoodBack1,
  [LongshipTile.Wood15]: WoodBack1,
  [LongshipTile.Wood21]: WoodBack2,
  [LongshipTile.House11]: HouseBack1,
  [LongshipTile.House12]: HouseBack1,
  [LongshipTile.House13]: HouseBack1,
  [LongshipTile.House14]: HouseBack1,
  [LongshipTile.House21]: HouseBack2
}

const images = {
  [LongshipTile.Castle31]: Castle1,
  [LongshipTile.Castle32]: Castle2,
  [LongshipTile.Castle33]: Castle3,
  [LongshipTile.Castle41]: Castle4,
  [LongshipTile.Gold21]: Gold1,
  [LongshipTile.Gold22]: Gold2,
  [LongshipTile.Gold23]: Gold3,
  [LongshipTile.Gold31]: Gold4,
  [LongshipTile.Watchtower11]: Watchtower1,
  [LongshipTile.Watchtower12]: Watchtower2,
  [LongshipTile.Watchtower13]: Watchtower3,
  [LongshipTile.Watchtower21]: Watchtower4,
  [LongshipTile.Watchtower22]: Watchtower5,
  [LongshipTile.Sheep11]: Sheep1,
  [LongshipTile.Sheep12]: Sheep2,
  [LongshipTile.Sheep13]: Sheep3,
  [LongshipTile.Sheep14]: Sheep4,
  [LongshipTile.Sheep21]: Sheep5,
  [LongshipTile.Sheep22]: Sheep6,
  [LongshipTile.Wood11]: Wood1,
  [LongshipTile.Wood12]: Wood2,
  [LongshipTile.Wood13]: Wood3,
  [LongshipTile.Wood14]: Wood4,
  [LongshipTile.Wood15]: Wood5,
  [LongshipTile.Wood21]: Wood6,
  [LongshipTile.House11]: House1,
  [LongshipTile.House12]: House2,
  [LongshipTile.House13]: House3,
  [LongshipTile.House14]: House4,
  [LongshipTile.House21]: House5
}

export const longshipTileDescription = new LongshipTileDescription()
