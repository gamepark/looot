/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Coordinates, Location } from '@gamepark/rules-api'

class MainBoardLocator extends Locator {
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
          .material(MaterialType.MainBoard)
          .getItems()
          .find((it) => this.getIndex(it.location) === 0)
        if (board1) {
          const base = this.getCoordinates(board1.location, context)
          const relativesLocations = locationsRelativesFromBoard1[this.getRotate(board1.location)][this.getRotate(location)]
          return { x: base.x! + relativesLocations.x, y: base.y! + relativesLocations.y }
        }
        return { x: 0, y: 0 }
      }
      case 2: {
        const board2 = context.rules
          .material(MaterialType.MainBoard)
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
          .material(MaterialType.MainBoard)
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
        return { x: -10, y: 0 }
      case 3:
        return { x: -20, y: 0 }
      case 4:
      default:
        return { x: -30, y: 0 }
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
    { x: 17.5, y: -6.9 },
    { x: 18.5, y: 0.05 },
    { x: 15.7, y: -4.8 }
  ],
  [
    { x: 14.7, y: -11.7 },
    { x: 15.7, y: -4.8 },
    { x: 12.9, y: -9.6 }
  ],
  [
    { x: 20.3, y: -7.45 },
    { x: 17.5, y: -6.9 },
    { x: 14.7, y: -11.7 }
  ]
]

const locationsRelativesFromBoard2 = [
  [
    { x: 15.7, y: 4.8 },
    { x: 14.8, y: 11.75 },
    { x: 12.9, y: 9.6 }
  ],
  [
    { x: 18.5, y: -0.05 },
    { x: 17.5, y: 6.9 },
    { x: 15.7, y: 4.8 }
  ],
  [
    { x: 17.5, y: 6.9 },
    { x: 20.3, y: 7.45 },
    { x: 14.7, y: 11.7 }
  ]
]

export const mainBoardLocator = new MainBoardLocator()
