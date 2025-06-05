/** @jsxImportSource @emotion/react */
import { LoootRules } from '@gamepark/looot/LoootRules'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { CustomMoveType } from '@gamepark/looot/rules/CustomMove'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const TakeLongshipAndTrophyHeader = () => {
  const player = usePlayerId()
  const rules = useRules<LoootRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const takeTrophyMove = useLegalMove((move: MaterialMove) => isMoveItemType(MaterialType.Trophy)(move))
  const takeLongshipMove = useLegalMove((move: MaterialMove) => isMoveItemType(MaterialType.Longship)(move))
  const pass = useLegalMove((move: MaterialMove) => isCustomMoveType(CustomMoveType.Pass)(move))

  if (itsMe) {
    if (takeLongshipMove && takeTrophyMove) {
      return (
        <Trans
          defaults="header.take.longship.and.trophy.you"
          components={{
            pass: <PlayMoveButton move={pass} />
          }}
        />
      )
    }
    if (takeLongshipMove && !takeTrophyMove) {
      return (
        <Trans
          defaults="header.take.longship.you"
          components={{
            pass: <PlayMoveButton move={pass} />
          }}
        />
      )
    }
    if (!takeLongshipMove && takeTrophyMove) {
      return (
        <Trans
          defaults="header.take.trophy.you"
          components={{
            pass: <PlayMoveButton move={pass} />
          }}
        />
      )
    }
    return (
      <Trans
        defaults="header.take.longship.and.trophy.pass"
        components={{
          pass: <PlayMoveButton move={pass} auto={10} />
        }}
      />
    )
  }

  return <Trans defaults="header.take.longship.and.trophy.player" values={{ player: name }} />
}
