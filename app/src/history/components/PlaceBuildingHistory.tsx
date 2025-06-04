/** @jsxImportSource @emotion/react */

import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const PlaceBuildingHistory = (props: MoveComponentProps) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const building = context.game.items[MaterialType.BuildingTile][move.itemIndex] as MaterialItem

  return (
    <Trans defaults="history.place.building" values={{ player: name, building: building.id }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.BuildingTile, building)} transient />
    </Trans>
  )
}
