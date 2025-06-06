/** @jsxImportSource @emotion/react */

import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const TakeTrophyHistory = (props: MoveComponentProps) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const trophy = context.game.items[MaterialType.TrophyTile][move.itemIndex] as MaterialItem

  return (
    <Trans defaults="history.take.trophy" values={{ player: name, trophy: trophy.id }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.TrophyTile, trophy)} transient />
    </Trans>
  )
}
