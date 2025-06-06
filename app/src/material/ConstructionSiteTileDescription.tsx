/** @jsxImportSource @emotion/react */
import { ConstructionSite } from '@gamepark/looot/material/ConstructionSite'
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
import { ConstructionSiteTileHelp } from './help/ConstructionSiteTileHelp'

export class ConstructionSiteTileDescription extends CardDescription {
  height = 2.9
  width = 3.2

  backImages = backImages
  images = images

  isFlipped(item: Partial<MaterialItem>): boolean {
    return item.location?.rotation as boolean
  }

  help = ConstructionSiteTileHelp
}

const backImages = {
  [ConstructionSite.Port1]: PortBack,
  [ConstructionSite.Port2]: PortBack,
  [ConstructionSite.Port3]: PortBack,
  [ConstructionSite.Port4]: PortBack,
  [ConstructionSite.Port5]: PortBack,
  [ConstructionSite.Altar1]: AltarBack,
  [ConstructionSite.Altar2]: AltarBack,
  [ConstructionSite.Altar3]: AltarBack,
  [ConstructionSite.Altar4]: AltarBack,
  [ConstructionSite.Altar5]: AltarBack,
  [ConstructionSite.Palace1]: PalaceBack,
  [ConstructionSite.Palace2]: PalaceBack,
  [ConstructionSite.Palace3]: PalaceBack,
  [ConstructionSite.Palace4]: PalaceBack,
  [ConstructionSite.Palace5]: PalaceBack
}

const images = {
  [ConstructionSite.Port1]: Port1,
  [ConstructionSite.Port2]: Port2,
  [ConstructionSite.Port3]: Port3,
  [ConstructionSite.Port4]: Port4,
  [ConstructionSite.Port5]: Port5,
  [ConstructionSite.Altar1]: Altar1,
  [ConstructionSite.Altar2]: Altar2,
  [ConstructionSite.Altar3]: Altar3,
  [ConstructionSite.Altar4]: Altar4,
  [ConstructionSite.Altar5]: Altar5,
  [ConstructionSite.Palace1]: Palace1,
  [ConstructionSite.Palace2]: Palace2,
  [ConstructionSite.Palace3]: Palace3,
  [ConstructionSite.Palace4]: Palace4,
  [ConstructionSite.Palace5]: Palace5
}

export const constructionSiteTileDescription = new ConstructionSiteTileDescription()
