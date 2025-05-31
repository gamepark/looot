import { css } from '@emotion/react'
import { Building } from '@gamepark/looot/material/Building'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { Resource } from '@gamepark/looot/material/Resource'
import { linkButtonCss, PlayMoveButton } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const woodBtn = <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.ResourceTile, { id: Resource.Wood })} transient />
export const sheepBtn = <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.ResourceTile, { id: Resource.Sheep })} transient />
export const goldBtn = <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.ResourceTile, { id: Resource.Gold })} transient />
export const axeBtn = <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.ResourceTile, { id: Resource.Axe })} transient />
export const houseBtn = <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.BuildingTile, { id: Building.House })} transient />
export const towerBtn = <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.BuildingTile, { id: Building.Watchtower })} transient />
export const castleBtn = <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.BuildingTile, { id: Building.Castle })} transient />

export const note = css`
  border: 1px solid black;
  padding: 1em;
  background: rgba(255, 255, 120, 0.2);
  border-radius: 5px;
`

export const list = css`
  margin-bottom: 5px;
`

export const getGroupedResources = (resources: number[]) => {
  const res: { total: number; id: number }[] = []
  resources.forEach((it) => {
    const index = res.findIndex((r) => r.id === it)
    if (index === -1) {
      res.push({ total: 1, id: it })
    } else {
      res[index].total += 1
    }
  })
  return res
}
