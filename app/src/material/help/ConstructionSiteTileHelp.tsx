/** @jsxImportSource @emotion/react */
import { constructionSiteRequirements, ConstructionSite, getConstructionSiteType } from '@gamepark/looot/material/ConstructionSite'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { axeBtn, castleBtn, getGroupedResources, goldBtn, houseBtn, list, note, sheepBtn, towerBtn, woodBtn } from './utils'

const components = {
  bold: <strong />,
  underline: <u />
}

export const ConstructionSiteTileHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()

  const type = getConstructionSiteType(item.id as ConstructionSite)
  const resources = constructionSiteRequirements[item.id as ConstructionSite]

  return (
    <>
      <h2>{t(`help.construction.site.tile`)}</h2>
      <p>
        <Trans defaults={`help.construction.site.tile.descr.1`} components={components} />
      </p>
      <p>
        <Trans defaults={`help.construction.site.tile.descr.2`} components={components} />
      </p>
      <p>
        <Trans defaults={`help.construction.site.tile.descr.3`} components={components} />
      </p>
      <p css={note}>
        <Trans defaults={`help.construction.site.tile.note`} components={components} />
      </p>
      <p>
        <Trans defaults={`help.construction.site.tile.explain`} components={components} values={{ type }} />
      </p>
      <p>
        <Trans defaults={`help.construction.site.tile.resources`} components={components} values={{ type }} />
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
    </>
  )
}
