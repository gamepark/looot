/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Coordinates, Location } from '@gamepark/rules-api'

class LandscapeBoardLocator extends Locator {
  getRotateZ(location: Location): number {
    const baseRotate = this.getIndex(location) === 0 || this.getIndex(location) === 2 ? 0 : 60
    const gapRotate = 120

    return baseRotate + gapRotate * this.getRotate(location)
  }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    if (this.getIndex(location) === 0) return this.getBaseCoordinates(context)

    switch (this.getIndex(location)) {
      case 1: {
        const board1 = context.rules
          .material(MaterialType.LandscapeBoard)
          .getItems()
          .find((it) => this.getIndex(it.location) === 0)
        if (board1) {
          const base = this.getCoordinates(board1.location, context)
          const relativesLocations = locationsRelativesFromBoard1[this.getRotate(board1.location)][this.getRotate(location)]
          console.log(relativesLocations)
          return { x: base.x! + relativesLocations.x, y: base.y! + relativesLocations.y }
        }
        return { x: 0, y: 0 }
      }
      case 2: {
        const board2 = context.rules
          .material(MaterialType.LandscapeBoard)
          .getItems()
          .find((it) => this.getIndex(it.location) === 1)
        if (board2) {
          const base = this.getCoordinates(board2.location, context)
          const relativesLocations = locationsRelativesFromBoard2[this.getRotate(board2.location)][this.getRotate(location)]
          return { x: base.x! + relativesLocations.x, y: base.y! + relativesLocations.y }
        }
        return { x: 0, y: 0 }
      }
      case 3:
      default: {
        const board3 = context.rules
          .material(MaterialType.LandscapeBoard)
          .getItems()
          .find((it) => this.getIndex(it.location) === 2)
        if (board3) {
          const base = this.getCoordinates(board3.location, context)
          const relativesLocations = locationsRelativesFromBoard1[this.getRotate(board3.location)][this.getRotate(location)]
          return { x: base.x! + relativesLocations.x, y: base.y! + relativesLocations.y }
        }
        return { x: 0, y: 0 }
      }
    }
  }

  getBaseCoordinates(context: MaterialContext): Partial<Coordinates> {
    switch (context.rules.players.length) {
      case 2:
        return { x: -5, y: 0 }
      case 3:
        return { x: -12, y: 0 }
      case 4:
      default:
        return { x: -17, y: 0 }
    }
  }

  getRotate(location: Location): number {
    return location.id % 10
  }

  getIndex(location: Location): number {
    return Math.floor(location.id / 10)
  }
}

const locationsRelativesFromBoard1 = [
  [
    { x: 13.59, y: -5.36 },
    { x: 14.37, y: 0.03 },
    { x: 12.34, y: -3.72 }
  ],
  [
    { x: 11.42, y: -9.09 },
    { x: 12.34, y: -3.72 },
    { x: 10.02, y: -7.45 }
  ],
  [
    { x: 15.77, y: -5.78 },
    { x: 13.59, y: -5.36 },
    { x: 11.42, y: -9.09 }
  ]
]


const locationsRelativesFromBoard2 = [
  [
    { x: 12.19, y: 3.72 },
    { x: 11.49, y: 9.12 },
    { x: 10.02, y: 7.45 }
  ],
  [
    { x: 14.37, y: -0.03 },
    { x: 13.59, y: 5.36 },
    { x: 12.19, y: 3.72 }
  ],
  [
    { x: 13.59, y: 5.36 },
    { x: 15.77, y: 5.78 },
    { x: 11.42, y: 9.09 }
  ]
]

export const landscapeBoardLocator = new LandscapeBoardLocator()
