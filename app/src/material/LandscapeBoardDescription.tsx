/** @jsxImportSource @emotion/react */
import { LandscapeBoard } from '@gamepark/looot/material/LandscapeBoard'
import { PolyhexDescription } from '@gamepark/react-game'
import { HexGridSystem } from '@gamepark/rules-api'
import { range } from 'lodash'
import Board1 from '../images/plateaux/plateau1.png'
import Board2 from '../images/plateaux/plateau2.png'
import Board3 from '../images/plateaux/plateau3.png'
import Board4 from '../images/plateaux/plateau4.png'
import Board5 from '../images/plateaux/plateau5.png'
import Board6 from '../images/plateaux/plateau6.png'
import Board7 from '../images/plateaux/plateau7.png'
import Board8 from '../images/plateaux/plateau8.png'

export class LandscapeBoardDescription extends PolyhexDescription {
  height = 18.46
  width = 21.1
  images = images
  coordinatesSystem = HexGridSystem.EvenQ

  getPolyhexShape() {
    return range(0, 5).flatMap((y) => range(0, 7).map((x) => ({ x, y })))
  }
}

const images = {
  [LandscapeBoard.LandscapeBoard1]: Board1,
  [LandscapeBoard.LandscapeBoard2]: Board2,
  [LandscapeBoard.LandscapeBoard3]: Board3,
  [LandscapeBoard.LandscapeBoard4]: Board4,
  [LandscapeBoard.LandscapeBoard5]: Board5,
  [LandscapeBoard.LandscapeBoard6]: Board6,
  [LandscapeBoard.LandscapeBoard7]: Board7,
  [LandscapeBoard.LandscapeBoard8]: Board8
}

export const landscapeBoardDescription = new LandscapeBoardDescription()
