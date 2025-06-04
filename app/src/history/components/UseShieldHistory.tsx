/** @jsxImportSource @emotion/react */

import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const UseShieldHistory = (props: MoveComponentProps) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const shield = context.game.items[MaterialType.Shield][move.itemIndex] as MaterialItem

  return (
    <Trans defaults="history.use.shield" values={{ player: name }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.Shield, shield)} transient />
    </Trans>
  )
}
