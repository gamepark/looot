import { LandscapeBoard } from '../../LandscapeBoard'
import { LandscapeBoardRepresentation } from './LandscapeBoardRepresentation'
import { E, T, S, C, G, H, A, W } from './LandscapeCaseType'

const front = [
  [E, E, G, S, W, E, E],
  [E, E, W, T, W, E, E],
  [E, A, C, A, A, S, E],
  [S, A, A, W, T, H, W],
  [H, S, W, G, S, A, G]
]

const back = [
  [E, E, W, A, S, E, E],
  [E, E, S, T, W, E, E],
  [E, W, C, G, A, H, E],
  [S, A, W, A, T, A, H],
  [G, W, A, S, G, W, S]
]

export const board2 = new LandscapeBoardRepresentation(LandscapeBoard.LandscapeBoard2, front, back)
