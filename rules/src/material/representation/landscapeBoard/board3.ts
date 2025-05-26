import { LandscapeBoard } from '../../LandscapeBoard'
import { LandscapeBoardRepresentation } from './LandscapeBoardRepresentation'
import { A, C, E, G, H, S, T, W } from './LandscapeCaseType'

const front = [
  [E, E, S, W, G, E, E],
  [E, E, W, T, A, E, E],
  [E, S, C, A, A, S, E],
  [W, H, A, W, T, G, H],
  [G, A, S, W, S, W, A]
]

const back = [
  [E, E, G, A, S, E, E],
  [E, E, W, T, W, E, E],
  [E, A, W, W, A, S, E],
  [H, A, C, G, T, W, S],
  [A, W, S, H, A, S, G]
]

export const board3 = new LandscapeBoardRepresentation(LandscapeBoard.LandscapeBoard3, front, back)
