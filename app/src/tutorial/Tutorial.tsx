/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/looot/material/LocationType'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { me, opponent, TutorialSetup } from './TutorialSetup'

export class Tutorial extends MaterialTutorial<number, MaterialType, LocationType> {
  version = 2

  players = [
    { id: me },
    {
      id: opponent,
      name: 'Mimi',
      avatar: {
        topType: 'LongHairBigHair',
        accessoriesType: 'Prescription01',
        hairColor: 'Red',
        facialHairType: 'Blank',
        clotheType: 'ShirtScoopNeck',
        clotheColor: 'PastelGreen',
        eyeType: 'Wink',
        eyebrowType: 'Default',
        mouthType: 'Twinkle',
        skinColor: 'Pale'
      }
    }
  ]

  options = {
    players: [{ id: me }, { id: opponent }]
  }

  setup = new TutorialSetup()

  steps: TutorialStep[] = []
}
