/** @jsxImportSource @emotion/react */

import { ConstructionSiteTile, getConstructionSiteType } from '@gamepark/looot/material/ConstructionSiteTile'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const CompleteConstructionSiteHistory = (props: MoveComponentProps) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const constructionSite = context.game.items[MaterialType.ConstructionSiteTile][move.itemIndex] as MaterialItem

  return (
    <Trans defaults="history.complete.construction.site" values={{ player: name, site: getConstructionSiteType(constructionSite.id as ConstructionSiteTile)}}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.ConstructionSiteTile, constructionSite)} transient />
    </Trans>
  )
}
