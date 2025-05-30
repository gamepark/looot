/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { CardDescription } from '@gamepark/react-game'

export class HexagoneDescription extends CardDescription {
  getFrontExtraCss(): Interpolation<Theme> {
    return css`
      aspect-ratio: 1 / cos(30deg);
      clip-path: polygon(50% -50%, 100% 50%, 50% 150%, 0 50%);
    `
  }
}
