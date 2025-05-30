import { OceanBoard, oceanBoards } from '@gamepark/looot/material/OceanBoard'
import { PolyhexDescription } from '@gamepark/react-game'
import { HexGridSystem } from '@gamepark/rules-api'

export abstract class SideBoardDescription extends PolyhexDescription {
  height = 6.78
  width = 15.26
  coordinatesSystem = HexGridSystem.EvenQ
  polyhexShape = oceanBoards[OceanBoard.OceanBoard1] // All side boards have the same shape
}
