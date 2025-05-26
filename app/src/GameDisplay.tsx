/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = ({ players }: GameDisplayProps) => {
  const margin = { top: 7, left: 0, right: 0, bottom: 0 }

  const getTableWidth = (): { xMin: number; xMax: number; yMin: number; yMax: number } => {
    switch (players) {
      case 2:
        return { xMin: -50, xMax: 50, yMin: -17, yMax: 30 }
      case 3:
        return { xMin: -55, xMax: 55, yMin: -35, yMax: 35 }
      case 4:
      default:
        return { xMin: -60, xMax: 60, yMin: -35, yMax: 35 }
    }
  }

  const getNavigationCss = () => {
    if (players < 3) {
      return css`
        left: 1em;
        top: 8em;
      `
    }
    return css`
      left: 31em;
      top: 8em;
    `
  }

  return (
    <>
      <GameTable
        xMin={getTableWidth().xMin}
        xMax={getTableWidth().xMax}
        yMin={getTableWidth().yMin}
        yMax={getTableWidth().yMax}
        margin={margin}
        css={process.env.NODE_ENV === 'development' && tableBorder}
      >
        <GameTableNavigation css={getNavigationCss()} />
        <PlayerPanels />
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
