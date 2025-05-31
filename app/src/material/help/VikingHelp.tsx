/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const VikingHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.viking`)}</h2>
      <p>
        <Trans defaults={`help.viking.descr.1`} components={components} />
      </p>
      <ul>
        <li>
          <Trans defaults={`help.viking.rule.1`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.viking.rule.2`} components={components} />
        </li>
      </ul>
      <p>
        <Trans defaults={`help.viking.descr.2`} components={components} />
      </p>
      <p>
        <Trans defaults={`help.viking.descr.3`} components={components} />
      </p>
      <p>
        <Trans defaults={`help.viking.descr.4`} components={components} />
      </p>
    </>
  )
}
