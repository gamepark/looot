/** @jsxImportSource @emotion/react */
import { LoootRules } from '@gamepark/looot/LoootRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const PlaceResourceHeader = () => {
  const player = usePlayerId()
  const rules = useRules<LoootRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans defaults="header.place.resource.you" />
  }

  return <Trans defaults="header.place.resource.player" values={{ player: name }} />
}
