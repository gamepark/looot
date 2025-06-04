/** @jsxImportSource @emotion/react */

import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const PlaceResourceHistory = (props: MoveComponentProps) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const resource = context.game.items[MaterialType.ResourceTile][move.itemIndex] as MaterialItem

  return (
    <Trans defaults="history.place.resource" values={{ player: name, resource: resource.id }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.ResourceTile, resource)} transient />
    </Trans>
  )
}
