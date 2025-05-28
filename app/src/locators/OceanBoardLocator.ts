/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { landscapeBoardLocator } from './LandscapeBoardLocator'

class OceanBoardLocator extends Locator {
  getRotateZ(location: Location): number {
    return location.parent === 2 ? 60 : 120
  }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(MaterialType.LandscapeBoard).index(location.parent).getItem()
  }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const parentRotate = landscapeBoardLocator.getRotate(this.getParentItem(location, context)!.location)
    const base = landscapeBoardLocator.getCoordinates(this.getParentItem(location, context)!.location, context)
    const relative =
      location.parent === 2
        ? possibleLocationsRelativesFromRightLandscapeBoardFor3[parentRotate]
        : possibleLocationsRelativesFromRightLandscapeBoard[parentRotate]

    return { x: base.x! + relative.x, y: base.y! + relative.y }
  }
}

const possibleLocationsRelativesFromRightLandscapeBoard = [
  { x: 9.32, y: 1.22 },
  { x: 8.65, y: 2.47 },
  { x: 10.8, y: 2.9 }
]

const possibleLocationsRelativesFromRightLandscapeBoardFor3 = [
  { x: 8.7, y: -2.5 },
  { x: 6.4, y: -6.2 },
  { x: 7.95, y: -7.95 }
]

export const oceanBoardLocator = new OceanBoardLocator()
