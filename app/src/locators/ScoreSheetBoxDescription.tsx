/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { Avatar, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

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

const ScoreDisplay = ({ location }: { location: Location }) => {
  if (location.y === 0) {
    return <Avatar css={avatarStyle} playerId={location.player} />
  } else {
    return <span css={[scoreStyle, location.y === 10 && bold, color(location.player!)]}>{location.z}</span>
  }
}

const scoreStyle = css`
  text-align: right;
  font-size: 0.6em;
  color: black;
`

const bold = css`
  font-weight: bold;
  margin-top: 0.5em;
`

const color = (player: PlayerColor) => css`
  color: ${playerColors[player]};
`

const playerColors: Record<PlayerColor, string> = {
  [PlayerColor.Grey]: '#4f535a',
  [PlayerColor.Blue]: '#056485',
  [PlayerColor.Red]: '#9a2a1f',
  [PlayerColor.Yellow]: '#938a1e'
}

const avatarStyle = css`
  border-radius: 100%;
  height: 1em;
  width: 1em;
  color: black;
  box-shadow: 0 0 0.1em black;
`
