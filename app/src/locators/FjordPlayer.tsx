/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LoootRules } from '@gamepark/looot/LoootRules'
import { MemoryType } from '@gamepark/looot/rules/Memory'
import { Avatar, PlayerTimer, usePlayerName, useRules } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { FC } from 'react'
import Star from '../images/panels/star.png'

type FjordPlayerProps = {
  location: Location
}

export const FjordPlayer: FC<FjordPlayerProps> = (props) => {
  const { location } = props
  const { player } = location
  const playerName = usePlayerName(player)

  return (
    <div css={reminderStyle}>
      <Avatar css={avatarStyle} playerId={player} />
      <span css={playerNameStyle}>{playerName}</span>
      <PlayerTimer playerId={player} css={[timerStyle]} />
      <Counter player={player!} />
    </div>
  )
}

type CounterProps = {
  player: number
}
const Counter: FC<CounterProps> = ({ player }) => {
  const rules = useRules<LoootRules>()!
  const score = rules.remind(MemoryType.PlayerScore, player) ?? 0
  return (
    <span css={[scoreStyle]}>
      <div css={[mainIconBackground(Star)]} />
      <span>{score}</span>
    </span>
  )
}

const reminderStyle = css`
  height: 100%;
  width: 100%;
  color: white;
  white-space: nowrap;
  transform: translateZ(0.1em);
  z-index: 100;
`

const avatarStyle = css`
  position: absolute;
  top: 2.5em;
  right: 0.5em;
  border-radius: 100%;
  height: 3em;
  width: 3em;
  color: black;
`

const playerNameStyle = css`
  position: absolute;
  font-size: 1em;
  top: 0.3em;
  right: 0.3em;
  padding: 0.2em;
  padding-right: 0.5em;
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 8.5em;
  font-size: 1.1em;
  align-self: center;
  border-radius: 0.5em;
  background-color: rgba(0, 0, 0, 0.6);
`

const timerStyle = css`
  position: absolute;
  font-size: 1.2em;
  bottom: 0.3em;
  left: 0.3em;
  padding: 0.2em;
  padding-right: 0.5em;
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 3.6em;
  align-self: center;
  border-radius: 0.5em;
  background-color: rgba(0, 0, 0, 0.9);
`

const scoreStyle = css`
  position: absolute;
  font-size: 1.2em;
  bottom: 0.3em;
  right: 0.3em;
  padding: 0.25em 0.4em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 4em;
  align-self: center;
  border-radius: 0.5em;
  background-color: rgba(0, 0, 0, 0.8);
`

const mainIconBackground = (image: string) => css`
  background-image: url(${image});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 1em;
  width: 1em;
  align-self: center;
`
