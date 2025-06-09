/** @jsxImportSource @emotion/react */
import { pointerWithin } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { landscapeLocator } from './locators/LandscapeLocator'
import { fjordBoardDescription } from './material/FjordBoardDescription'

type Props = {
  game: MaterialGame
}

export const GameDisplay = ({ game }: Props) => {
  const margin = { top: 7, left: 0, right: 0, bottom: 0 }
  const players = game.players.length
  const landscapeSize = landscapeLocator.getLandscapeSize(game)
  const horizontalSpaceForPlayers = fjordBoardDescription.width + 5
  const verticalSpaceForPlayer = fjordBoardDescription.height
  const verticalSpaceForPlayers = players === 2 ? verticalSpaceForPlayer + 10 : verticalSpaceForPlayer * 2 + 2
  const xMax = landscapeSize.width / 2 + horizontalSpaceForPlayers + 1
  const xMin = -xMax
  const yMax = Math.max(landscapeSize.height / 2, verticalSpaceForPlayers / 2) + 1
  const yMin = -yMax

  const getNavigationCss = () => {
    if (players < 4) {
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
        xMin={xMin}
        xMax={xMax}
        yMin={yMin}
        yMax={yMax}
        margin={margin}
        css={process.env.NODE_ENV === 'development' && tableBorder}
        collisionAlgorithm={pointerWithin}
        verticalCenter
      >
        <GameTableNavigation css={getNavigationCss()} />
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
