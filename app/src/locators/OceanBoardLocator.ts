/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { landscapeBoardLocator } from './LandscapeBoardLocator'

class OceanBoardLocator extends Locator {
  getRotateZ(location: Location, context: MaterialContext): number {
    const parentRotate = landscapeBoardLocator.getRotate(this.getParentItem(location, context)!.location)
    return location.parent === 2
      ? possibleLocationsRelativesFromRightLandscapeBoardFor3[parentRotate][location.id].rotateZ
      : possibleLocationsRelativesFromRightLandscapeBoard[parentRotate][location.id].rotateZ
  }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(MaterialType.LandscapeBoard).index(location.parent).getItem()
  }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const parentRotate = landscapeBoardLocator.getRotate(this.getParentItem(location, context)!.location)
    const base = landscapeBoardLocator.getCoordinates(this.getParentItem(location, context)!.location, context)
    const relative =
      location.parent === 2
        ? possibleLocationsRelativesFromRightLandscapeBoardFor3[parentRotate][location.id].location
        : possibleLocationsRelativesFromRightLandscapeBoard[parentRotate][location.id].location

    return { x: base.x! + relative.x, y: base.y! + relative.y }
  }
}

const possibleLocationsRelativesFromRightLandscapeBoard = [
  [
    { location: { x: 8.4, y: 1.1 }, rotateZ: 120 },
    { location: { x: 5.8, y: 5.6 }, rotateZ: 120 },
    { location: { x: 3.2, y: 10.15 }, rotateZ: 120 }
  ],
  [
    { location: { x: 10.4, y: -2.3 }, rotateZ: 120 },
    { location: { x: 7.8, y: 2.25 }, rotateZ: 120 },
    { location: { x: 5.2, y: 6.75 }, rotateZ: 120 }
  ],
  [
    { location: { x: 12.4, y: -1.9 }, rotateZ: 120 },
    { location: { x: 9.7, y: 2.6 }, rotateZ: 120 },
    { location: { x: 7.15, y: 7.15 }, rotateZ: 120 }
  ]
]

const possibleLocationsRelativesFromRightLandscapeBoardFor3 = [
  [
    { location: { x: 10.4, y: 2.3 }, rotateZ: 60 },
    { location: { x: 7.8, y: 2.25 }, rotateZ: 60 },
    { location: { x: 5.2, y: -6.75 }, rotateZ: 60 }
  ],
  [
    { location: { x: 8.45, y: -1.15 }, rotateZ: 60 },
    { location: { x: 5.85, y: -5.65 }, rotateZ: 60 },
    { location: { x: 3.2, y: -10.15 }, rotateZ: 60 }
  ],
  [
    { location: { x: 7.15, y: -7.15 }, rotateZ: 60 },
    { location: { x: 9.75, y: -2.6 }, rotateZ: 60 },
    { location: { x: 12.35, y: 1.9 }, rotateZ: 60 }
  ]
]

export const oceanBoardLocator = new OceanBoardLocator()
