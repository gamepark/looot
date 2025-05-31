/** @jsxImportSource @emotion/react */
import { ConstructionSiteTile } from '@gamepark/looot/material/ConstructionSiteTile'
import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Port1 from '../images/chantiers/port1.png'
import Port2 from '../images/chantiers/port2.png'
import Port3 from '../images/chantiers/port3.png'
import Port4 from '../images/chantiers/port4.png'
import Port5 from '../images/chantiers/port5.png'
import PortBack from '../images/chantiers/port_back.png'
import Altar1 from '../images/chantiers/autel1.png'
import Altar2 from '../images/chantiers/autel2.png'
import Altar3 from '../images/chantiers/autel3.png'
import Altar4 from '../images/chantiers/autel4.png'
import Altar5 from '../images/chantiers/autel5.png'
import AltarBack from '../images/chantiers/autel_back.png'
import Palace1 from '../images/chantiers/palais1.png'
import Palace2 from '../images/chantiers/palais2.png'
import Palace3 from '../images/chantiers/palais3.png'
import Palace4 from '../images/chantiers/palais4.png'
import Palace5 from '../images/chantiers/palais5.png'
import PalaceBack from '../images/chantiers/palais_back.png'

export class ConstructionSiteTileDescription extends CardDescription {
  height = 2.9
  width = 3.2

  backImages = backImages
  images = images

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.rotation as boolean
  }
}

const backImages = {
  [ConstructionSiteTile.Port1]: PortBack,
  [ConstructionSiteTile.Port2]: PortBack,
  [ConstructionSiteTile.Port3]: PortBack,
  [ConstructionSiteTile.Port4]: PortBack,
  [ConstructionSiteTile.Port5]: PortBack,
  [ConstructionSiteTile.Altar1]: AltarBack,
  [ConstructionSiteTile.Altar2]: AltarBack,
  [ConstructionSiteTile.Altar3]: AltarBack,
  [ConstructionSiteTile.Altar4]: AltarBack,
  [ConstructionSiteTile.Altar5]: AltarBack,
  [ConstructionSiteTile.Palace1]: PalaceBack,
  [ConstructionSiteTile.Palace2]: PalaceBack,
  [ConstructionSiteTile.Palace3]: PalaceBack,
  [ConstructionSiteTile.Palace4]: PalaceBack,
  [ConstructionSiteTile.Palace5]: PalaceBack
}

const images = {
  [ConstructionSiteTile.Port1]: Port1,
  [ConstructionSiteTile.Port2]: Port2,
  [ConstructionSiteTile.Port3]: Port3,
  [ConstructionSiteTile.Port4]: Port4,
  [ConstructionSiteTile.Port5]: Port5,
  [ConstructionSiteTile.Altar1]: Altar1,
  [ConstructionSiteTile.Altar2]: Altar2,
  [ConstructionSiteTile.Altar3]: Altar3,
  [ConstructionSiteTile.Altar4]: Altar4,
  [ConstructionSiteTile.Altar5]: Altar5,
  [ConstructionSiteTile.Palace1]: Palace1,
  [ConstructionSiteTile.Palace2]: Palace2,
  [ConstructionSiteTile.Palace3]: Palace3,
  [ConstructionSiteTile.Palace4]: Palace4,
  [ConstructionSiteTile.Palace5]: Palace5
}

export const constructionSiteTileDescription = new ConstructionSiteTileDescription()
