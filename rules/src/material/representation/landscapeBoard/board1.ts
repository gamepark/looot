import { LandscapeBoard } from '../../LandscapeBoard'
import { LandscapeBoardRepresentation } from './LandscapeBoardRepresentation'
import { E, T, S, C, G, H, A, W } from './LandscapeCaseType'

const front = [
  [E, E, W, G, S, E, E],
  [E, E, A, T, G, E, E],
  [E, S, G, W, A, W, E],
  [A, H, T, A, C, H, W],
  [W, S, S, A, A, W, S]
]

const back = [
  [E, E, G, W, A, E, E],
  [E, E, W, T, S, E, E],
  [E, S, A, A, S, H, E],
  [A, W, T, W, C, A, S],
  [S, G, W, A, H, W, G]
]

export const board1 = new LandscapeBoardRepresentation(LandscapeBoard.LandscapeBoard1, front, back)
