/** @jsxImportSource @emotion/react */
import { LoootRules } from '@gamepark/looot/LoootRules'
import { CustomMoveType } from '@gamepark/looot/rules/CustomMove'
import { PlayMoveButton, useLegalMove, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const TakeTrophyHeader = () => {
  const player = usePlayerId()
  const rules = useRules<LoootRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const legalMoves = useLegalMoves()
  const pass = useLegalMove((move: MaterialMove) => isCustomMoveType(CustomMoveType.Pass)(move))

  if (itsMe) {
    if(legalMoves.length > 1) {
      return (
        <Trans
          defaults="header.take.trophy.you"
          components={{
            pass: <PlayMoveButton move={pass} />
          }}
        />
      )
    } else {
      return (
        <Trans
          defaults="header.take.trophy.pass"
          components={{
            pass: <PlayMoveButton move={pass} auto={10} />
          }}
        />
      )
    }
  }

  return <Trans defaults="header.take.trophy.player" values={{ player: name }} />
}
