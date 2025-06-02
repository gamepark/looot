/** @jsxImportSource @emotion/react */
import { LoootRules } from '@gamepark/looot/LoootRules'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { getShieldType } from '@gamepark/looot/material/Shield'
import { MaterialHelpProps, PlayMoveButton, useLegalMove, useRules } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const ShieldHelp: FC<MaterialHelpProps> = ({ item, closeDialog }) => {
  const { t } = useTranslation()
  const rules = useRules<LoootRules>()!
  const type = getShieldType(item.id)
  const useShield = useLegalMove(
    (move) => isMoveItemType(MaterialType.Shield)(move) && rules.material(MaterialType.Shield).index(move.itemIndex).getItem()?.id === item.id
  )
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
          {useShield && (
            <Trans
              defaults={`help.shield.bonus.use`}
              components={{
                ...components,
                shield: <PlayMoveButton move={useShield} onPlay={closeDialog} />
              }}
            />
          )}
        </>
      )}
    </>
  )
}
