/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/looot/rules/RuleId'
import { ComponentType } from 'react'
import { PlaceResourceHeader } from './PlaceResourceHeader'
import { PlaceVikingHeader } from './PlaceVikingHeader'
import { TakeLongshipAndTrophyHeader } from './TakeLongshipAndTrophyHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlaceViking]: PlaceVikingHeader,
  [RuleId.PlaceResource]: PlaceResourceHeader,
  [RuleId.TakeLongshipAndTrophy]: TakeLongshipAndTrophyHeader,
}
