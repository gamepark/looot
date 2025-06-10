/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const FjordBoardHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.fjord`)}</h2>
      <p>
        <Trans defaults={`help.fjord.descr`} components={components} />
      </p>
      <h2>{t(`help.fjord.scoring`)}</h2>
      <ul>
        <li>
          <Trans defaults={`help.fjord.scoring.wood`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.fjord.scoring.sheep`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.fjord.scoring.gold`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.fjord.scoring.house`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.fjord.scoring.watchtower`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.fjord.scoring.castle`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.fjord.scoring.seaport`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.fjord.scoring.altar`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.fjord.scoring.jarl`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.fjord.scoring.trophy`} components={components} />
        </li>
        <li>
          <Trans defaults={`help.fjord.scoring.drakkar`} components={components} />
        </li>
      </ul>
    </>
  )
}
