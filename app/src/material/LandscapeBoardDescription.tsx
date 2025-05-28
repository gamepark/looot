/** @jsxImportSource @emotion/react */
import { LandscapeBoard } from '@gamepark/looot/material/LandscapeBoard'
import { BoardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Board1 from '../images/plateaux/plateau1.png'
import Back1 from '../images/plateaux/plateau2.png'
import Board2 from '../images/plateaux/plateau3.png'
import Back2 from '../images/plateaux/plateau4.png'
import Board3 from '../images/plateaux/plateau5.png'
import Back3 from '../images/plateaux/plateau6.png'
import Board4 from '../images/plateaux/plateau7.png'
import Back4 from '../images/plateaux/plateau8.png'

export class LandscapeBoardDescription extends BoardDescription {
  height = 18.45
  width = 21.1

  backImages = backImages

  images = images

  isFlipped(item: Partial<MaterialItem>): boolean {
    return (item.location?.rotation as boolean) ?? false
  }
}

const backImages = {
  [LandscapeBoard.LandscapeBoard1]: Back1,
  [LandscapeBoard.LandscapeBoard2]: Back2,
  [LandscapeBoard.LandscapeBoard3]: Back3,
  [LandscapeBoard.LandscapeBoard4]: Back4
}

const images = {
  [LandscapeBoard.LandscapeBoard1]: Board1,
  [LandscapeBoard.LandscapeBoard2]: Board2,
  [LandscapeBoard.LandscapeBoard3]: Board3,
  [LandscapeBoard.LandscapeBoard4]: Board4
}

export const landscapeBoardDescription = new LandscapeBoardDescription()
