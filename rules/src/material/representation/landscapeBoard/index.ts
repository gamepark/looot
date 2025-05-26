import { LandscapeBoard } from '../../LandscapeBoard'
import { board1 } from './board1'
import { board2 } from './board2'
import { board3 } from './board3'
import { board4 } from './board4'

const boards = [board1, board2, board3, board4]

export const getLandscapeBoardRepresentation = (id: LandscapeBoard) => boards.find((board) => board.id === id)
