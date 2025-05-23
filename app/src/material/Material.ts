import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { mainBoardDescription } from './MainBoardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.MainBoard]: mainBoardDescription
}
