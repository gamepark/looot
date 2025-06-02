/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LoootRules } from '@gamepark/looot/LoootRules'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { shields } from '@gamepark/looot/material/Shield'
import { PlayMoveButton, useLegalMove, useRules } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { shieldDescription } from '../material/ShieldDescription'

const components = {
  bold: <strong />,
  underline: <u />
}

export const PlaceVikingHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<LoootRules>()!
  const activePlayer = rules.game.rule?.player

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
      {shields.map((shield, index) => (
        <Shield key={index} id={+`${activePlayer}${shield}`} shield={shield} />
      ))}
    </>
  )
}

interface ShieldProps {
  id: number
  shield: number
}

const Shield: React.FC<ShieldProps> = ({ id, shield }: ShieldProps) => {
  const rules = useRules<LoootRules>()!
  const useShield = useLegalMove(
    (move) => isMoveItemType(MaterialType.Shield)(move) && rules.material(MaterialType.Shield).index(move.itemIndex).getItem()?.id === id
  )
  return (
    <div css={flex}>
      <img src={shieldDescription.images[id]} css={shieldImg} />
      <div>
        <p>
          <Trans defaults={`help.shield.bonus.${shield}`} components={components} />
        </p>
        {useShield && (
          <Trans
            defaults={`help.shield.bonus.use`}
            components={{
              ...components,
              shield: <PlayMoveButton move={useShield} />
            }}
          />
        )}
      </div>
    </div>
  )
}

const flex = css`
  display: flex;
  align-items: center;
  column-gap: 1em;
  margin-bottom: 1em;
`

const shieldImg = css`
  width: 5em;
  height: 5em;
  box-shadow:
    0 0 0.1em black,
    0 0 0.1em black;
  border-radius: 50%;
`
