/** @jsxImportSource @emotion/react */
import { Trophy, trophyValue } from '@gamepark/looot/material/Trophy'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const TrophyHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()
  const nbHaches = item.id
  const value = trophyValue[item.id as Trophy]
  return (
    <>
      <h2>{t(`help.trophy`)}</h2>
      <p>
        <Trans defaults="help.trophy.descr.1" components={components} />
      </p>
      <p>
        <Trans defaults="help.trophy.descr.2" components={components} />
      </p>
      <p>
        <Trans defaults="help.trophy.descr.3" components={components} />
      </p>
      <Trans defaults={`help.trophy.explain`} components={components} values={{ nbHaches, value }} />
    </>
  )
}
