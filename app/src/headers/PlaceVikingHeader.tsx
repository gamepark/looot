/** @jsxImportSource @emotion/react */
import { LoootRules } from '@gamepark/looot/LoootRules'
import { RuleId } from '@gamepark/looot/rules/RuleId'
import { PlayMoveButton, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayRulesHelp = MaterialMoveBuilder.displayRulesHelp

export const PlaceVikingHeader = () => {
  const player = usePlayerId()
  const rules = useRules<LoootRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return (
      <Trans
        defaults="header.place.viking.you"
        components={{
          shield: <PlayMoveButton move={displayRulesHelp(RuleId.PlaceViking)} transient />
        }}
      />
    )
  }

  return <Trans defaults="header.place.viking.player" values={{ player: name }} />
}
