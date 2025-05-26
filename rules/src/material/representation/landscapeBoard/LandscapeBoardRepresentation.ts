import { Location, XYCoordinates } from '@gamepark/rules-api'
import { LandscapeBoard } from '../../LandscapeBoard'
import { C, E, H, T } from './LandscapeCaseType'

export class LandscapeBoardRepresentation {
  public id: LandscapeBoard
  private front: string[][]
  private back: string[][]

  constructor(id: LandscapeBoard, front: string[][], back: string[][]) {
    this.id = id
    this.front = front
    this.back = back
  }

  private max = { x: 6, y: 4 }

  houses = (location: Location) => this.findCoordonnees(this.getCurrentFace(location), H)
  towers = (location: Location) => this.findCoordonnees(this.getCurrentFace(location), T)
  castles = (location: Location) => this.findCoordonnees(this.getCurrentFace(location), C)

  getNeighbors(location: Location) {
    const x: number = location.x ?? 0
    const y: number = location.y ?? 0
    const neighbors =
      y % 2 === 0
        ? [
            { x: x + 1, y: y + 1 },
            { x: x + 1, y },
            { x, y: y - 1 },
            { x: x - 1, y },
            { x: x - 1, y: y + 1 },
            { x, y: y + 1 }
          ]
        : [
            { x: x + 1, y },
            { x: x + 1, y: y - 1 },
            { x, y: y - 1 },
            { x: x - 1, y: y - 1 },
            { x: x - 1, y },
            { x, y: y + 1 }
          ]

    return neighbors
      .filter((it) => it.x >= 0 && it.x <= this.max.x)
      .filter((it) => it.y >= 0 && it.y <= this.max.x)
      .filter((it) => this.getCurrentFace(location)[it.y][it.x] !== E)
  }

  private getCurrentFace(location: Location) {
    return location.rotation ? this.back : this.front
  }

  private findCoordonnees(grille: string[][], caseType: string): XYCoordinates[] {
    const coordonnees: XYCoordinates[] = []

    for (let y = 0; y < grille.length; y++) {
      for (let x = 0; x < grille[y].length; x++) {
        if (grille[y][x] === caseType) {
          coordonnees.push({ x, y })
        }
      }
    }

    return coordonnees
  }
}
