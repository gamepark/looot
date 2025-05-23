import { LocationType } from '@gamepark/looot/material/LocationType'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { mainBoardLocator } from './MainBoardLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.MainBoard]: mainBoardLocator
}
