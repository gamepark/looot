import { css } from '@emotion/react'
import { LocationDescription } from '@gamepark/react-game'
import { ScoreDisplay } from './ScoreDisplay.tsx'

export class ScoreSheetBoxDescription extends LocationDescription {
  height = 1
  width = 1

  extraCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
  `

  content = ScoreDisplay

  displayInParentItemHelp = true
}

