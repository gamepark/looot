/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { landscapeBoardLocator } from './LandscapeBoardLocator'

class TrophyBoardLocator extends Locator {
  getRotateZ(): number {
    return 300
  }

  getParentItem(_: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(MaterialType.LandscapeBoard).index(0).getItem()
  }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const parentRotate = landscapeBoardLocator.getRotate(this.getParentItem(location, context)!.location)
    const base = landscapeBoardLocator.getCoordinates(this.getParentItem(location, context)!.location, context)
    const relative = possibleLocationsRelativesFromLandscapeBoard[parentRotate]
    return { x: base.x! + relative.x, y: base.y! + relative.y }
  }
}

const possibleLocationsRelativesFromLandscapeBoard = [
  { x: -8.5, y: -2.4 },
  { x: -6.45, y: -6.25 },
  { x: -6.4, y: -6.2 }
]

export const trophyBoardLocator = new TrophyBoardLocator()
