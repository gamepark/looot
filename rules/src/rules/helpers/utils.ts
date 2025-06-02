import { Location } from '@gamepark/rules-api'

export const getNeighbors = (location: Location) => {
  const x: number = location.x ?? 0
  const y: number = location.y ?? 0
  const neighbors =
    x % 2 !== 0
      ? [
          { x: x + 1, y },
          { x: x + 1, y: y - 1 },
          { x, y: y - 1 },
          { x: x - 1, y: y - 1 },
          { x: x - 1, y },
          { x, y: y + 1 }
        ]
      : [
          { x: x + 1, y: y + 1 },
          { x: x + 1, y },
          { x, y: y - 1 },
          { x: x - 1, y },
          { x: x - 1, y: y + 1 },
          { x, y: y + 1 }
        ]

  return neighbors
}

export const locationsEquals = (loc1: Location, loc2: Location): boolean => {
  return loc1.x === loc2.x && loc1.y === loc2.y
}
