/** @jsxImportSource @emotion/react */
import { getShieldType } from '@gamepark/looot/material/Shield'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const ShieldHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()
  const type = getShieldType(item.id)
  return (
    <>
      <h2>{t(`help.shield`)}</h2>
      <p>
        <Trans defaults="help.shield.descr.1" components={components} />
      </p>
      <p>
        <Trans defaults="help.shield.descr.2" components={components} />
      </p>
      <p>
        <Trans defaults="help.shield.descr.3" components={components} />
      </p>
      {item.id && (
        <>
          <h3>{t(`help.shield.bonus`)}</h3>
          <p>
            <Trans defaults={`help.shield.bonus.${type}`} components={components} />
          </p>
        </>
      )}
    </>
  )
}
