/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/looot/rules/RuleId'
import { ComponentType } from 'react'
import { PlaceResourceHeader } from './PlaceResourceHeader'
import { PlaceVikingHeader } from './PlaceVikingHeader'
import { TakeLongshipHeader } from './TakeLongshipHeader'
import { TakeTrophyHeader } from './TakeTrophyHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlaceViking]: PlaceVikingHeader,
  [RuleId.PlaceResource]: PlaceResourceHeader,
  [RuleId.TakeLongship]: TakeLongshipHeader,
  [RuleId.TakeTrophy]: TakeTrophyHeader
}
