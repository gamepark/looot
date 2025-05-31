/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { castleBtn, houseBtn, towerBtn } from './utils'

const components = {
  bold: <strong />,
  underline: <u />
}

export const BuildingTileHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.building.tile`)}</h2>
      <p>
        <Trans
          defaults={`help.building.tile.descr.${item.id}`}
          components={{
            ...components,
            house: houseBtn,
            tower: towerBtn,
            castle: castleBtn
          }}
        />
      </p>
      <h3>{t(`help.building.tile.${item.id}`)}</h3>
      <p><Trans defaults={`help.building.tile.${item.id}.descr`} components={components} /></p>
      <p><Trans defaults={`help.building.tile.${item.id}.capture`} components={components} /></p>
    </>
  )
}
