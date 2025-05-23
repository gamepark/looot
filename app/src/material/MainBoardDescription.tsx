/** @jsxImportSource @emotion/react */
import { MainBoard } from '@gamepark/looot/material/MainBoard'
import { BoardDescription } from '@gamepark/react-game'
import Board1 from '../images/plateaux/plateau1.png'
import Board2 from '../images/plateaux/plateau2.png'
import Board3 from '../images/plateaux/plateau3.png'
import Board4 from '../images/plateaux/plateau4.png'
import Board5 from '../images/plateaux/plateau5.png'
import Board6 from '../images/plateaux/plateau6.png'
import Board7 from '../images/plateaux/plateau7.png'
import Board8 from '../images/plateaux/plateau8.png'

export class MainBoardDescription extends BoardDescription {
  height = 23.57
  width = 27

  backImages = backImages

  images = images
}

const backImages = {
  [MainBoard.MainBoard1]: Board2,
  [MainBoard.MainBoard2]: Board4,
  [MainBoard.MainBoard3]: Board6,
  [MainBoard.MainBoard4]: Board8
}

const images = {
  [MainBoard.MainBoard1]: Board1,
  [MainBoard.MainBoard2]: Board3,
  [MainBoard.MainBoard3]: Board5,
  [MainBoard.MainBoard4]: Board7
}

export const mainBoardDescription = new MainBoardDescription()
