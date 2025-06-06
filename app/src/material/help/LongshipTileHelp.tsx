/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { getLongshipType, getLongshipValue, Longship, longshipRequirements } from '@gamepark/looot/material/Longship'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { axeBtn, castleBtn, getGroupedResources, goldBtn, houseBtn, list, note, sheepBtn, towerBtn, woodBtn } from './utils'

const components = {
  bold: <strong />,
  underline: <u />
}

export const LongshipTileHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()

  const type = getLongshipType(item.id as Longship)
  const value = getLongshipValue(item.id as Longship)
  const resources = longshipRequirements[item.id as Longship]

  return (
    <>
      <h2>{t(`help.longship.tile`)}</h2>
      <p>
        <Trans defaults={`help.longship.tile.descr.1`} components={components} />
      </p>
      <p>
        <Trans defaults={`help.longship.tile.descr.2`} components={components} />
      </p>
      <p>
        <Trans defaults={`help.longship.tile.descr.3`} components={components} />
      </p>
      <p>
        <Trans defaults={`help.longship.tile.descr.4`} components={components} />
      </p>
      <p css={note}>
        <Trans defaults={`help.longship.tile.note`} components={components} />
      </p>
      <p>
        <Trans defaults={`help.longship.tile.explain`} components={components} values={{ type, value }} />
      </p>
      <p>
        <Trans defaults={`help.longship.tile.resources`} components={components} values={{ type }} />
      </p>
      <ul>
        {getGroupedResources(resources).map(({ total, id }, index) => (
          <li key={index} css={list}>
            <Trans
              defaults={`help.resources.${id}`}
              values={{ total }}
              components={{
                ...components,
                wood: woodBtn,
                sheep: sheepBtn,
                gold: goldBtn,
                axe: axeBtn,
                house: houseBtn,
                tower: towerBtn,
                castle: castleBtn
              }}
            />
          </li>
        ))}
      </ul>
      <p css={warning}>
        <Trans defaults={`help.longship.tile.warning`} components={components} values={{ type, value }} />
      </p>
    </>
  )
}

const warning = css`
  font-weight: bolder;
  color: #f63838;
`
