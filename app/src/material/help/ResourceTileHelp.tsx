/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { axeBtn, goldBtn, sheepBtn, woodBtn } from './utils'

const components = {
  bold: <strong />,
  underline: <u />
}

export const ResourceTileHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.resource.tile`)}</h2>
      <p>
        <Trans
          defaults={`help.resource.tile.descr.${item.id}`}
          components={{
            ...components,
            wood: woodBtn,
            gold: goldBtn,
            sheep: sheepBtn,
            axe: axeBtn
          }}
        />
      </p>
      <h3>{t(`help.resource.tile.${item.id}`)}</h3>
      <p><Trans defaults={`help.resource.tile.${item.id}.descr`} components={components} /></p>
    </>
  )
}
