/** @jsxImportSource @emotion/react */

import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const CompleteLongshipHistory = (props: MoveComponentProps) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const longship = context.game.items[MaterialType.LongshipTile][move.itemIndex] as MaterialItem

  return (
    <Trans defaults="history.complete.longship" values={{ player: name, longship: longship.id }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.LongshipTile, longship)} transient />
    </Trans>
  )
}
