/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { StyledPlayerPanel, usePlayers } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import BluePanel from '../images/panels/bleu.png'
import RedPanel from '../images/panels/rouge.png'
import GreyPanel from '../images/panels/gris.png'
import YellowPanel from '../images/panels/jaune.png'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => (
        <StyledPlayerPanel key={player.id} player={player} css={panelPosition(index)} backgroundImage={images[player.id]} />
      ))}
    </>,
    root
  )
}

const panelPosition = (index: number) => css`
  position: absolute;
  width: 28em;
  height: 8.3em;
  border: 0;
  ${panelPositionsByPlayerIndex[index]};
`
const panelPositionsByPlayerIndex = [
  css`
    bottom: 1em;
    left: 1em;
  `,
  css`
    bottom: 1em;
    right: 1em;
  `,
  css`
    top: 8.5em;
    left: 1em;
  `,
  css`
    top: 8.5em;
    right: 1em;
  `
]

const images: Record<PlayerColor, string> = {
  [PlayerColor.Blue]: BluePanel,
  [PlayerColor.Red]: RedPanel,
  [PlayerColor.Grey]: GreyPanel,
  [PlayerColor.Yellow]: YellowPanel
}
