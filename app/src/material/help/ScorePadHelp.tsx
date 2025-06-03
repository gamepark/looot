/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const ScorePadHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.scorepad`)}</h2>
      <p>
        <Trans defaults={`help.scorepad.descr.1`} components={components} />
      </p>
      <p>
        <Trans defaults={`help.scorepad.descr.2`} components={components} />
      </p>
      <ul>
        <li>
          <Trans defaults={`help.scorepad.list.1`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.scorepad.list.2`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.scorepad.list.3`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.scorepad.list.4`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.scorepad.list.5`} components={components} />
        </li>
      </ul>
      <p>
        <Trans defaults={`help.scorepad.descr.3`} components={components} />
      </p>
      <p>
        <Trans defaults={`help.scorepad.descr.4`} components={components} />
      </p>
      <p>
        <Trans defaults={`help.scorepad.descr.5`} components={components} />
      </p>
    </>
  )
}
