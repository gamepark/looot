import { LandscapeBoard } from '../../LandscapeBoard'
import { LandscapeBoardRepresentation } from './LandscapeBoardRepresentation'
import { E, T, S, G, H, A, W } from './LandscapeCaseType'

const front = [
  [E, E, W, S, G, E, E],
  [E, E, S, T, G, E, E],
  [E, G, A, A, S, H, E],
  [W, W, T, W, A, A, S],
  [S, H, A, W, A, H, W]
]

const back = [
  [E, E, A, G, S, E, E],
  [E, E, S, T, W, E, E],
  [E, H, W, A, S, G, E],
  [A, A, W, A, T, W, H],
  [W, H, S, S, W, G, A]
]

export const board4 = new LandscapeBoardRepresentation(LandscapeBoard.LandscapeBoard4, front, back)
