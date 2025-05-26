/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { landscapeBoardLocator } from './LandscapeBoardLocator'

class TrophyBoardLocator extends Locator {
  getRotateZ(location: Location, context: MaterialContext): number {
    const parentRotate = landscapeBoardLocator.getRotate(this.getParentItem(location, context)!.location)
    return possibleLocationsRelativesFromLandscapeBoard[parentRotate].rotateZ
  }

  getParentItem(_: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(MaterialType.LandscapeBoard).index(0).getItem()
  }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const parentRotate = landscapeBoardLocator.getRotate(this.getParentItem(location, context)!.location)
    const base = landscapeBoardLocator.getCoordinates(this.getParentItem(location, context)!.location, context)
    const relative = possibleLocationsRelativesFromLandscapeBoard[parentRotate].location
    return { x: base.x! + relative.x, y: base.y! + relative.y }
  }
}

const possibleLocationsRelativesFromLandscapeBoard = [
  { location: { x: -7.7, y: -2.2 }, rotateZ: 300 },
  { location: { x: -7.1, y: -7.1 }, rotateZ: 300 },
  { location: { x: -5.8, y: -5.6 }, rotateZ: 300 }
]

export const trophyBoardLocator = new TrophyBoardLocator()
