import { HexGridSystem, hexRotate, hexTranslate, Location, MaterialGame, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { Land, LandscapeBoard, landscapeBoards, Water } from '../../material/LandscapeBoard'
import { MaterialType } from '../../material/MaterialType'
import { OceanBoard, oceanBoards } from '../../material/OceanBoard'
import { trophyBoards } from '../../material/TrophyBoard'

export type Hex = Land | typeof Water | undefined

export class LandscapeHelper extends MaterialRulesPart {
  landscape: Hex[][] = []
  xMin = 0
  yMin = 0

  get xMax() {
    return this.xMin + Math.max(...this.landscape.map((line) => line.length))
  }

  get yMax() {
    return this.yMin + this.landscape.length
  }

  constructor(game: MaterialGame) {
    super(game)
    const landscapeBoardItems = this.material(MaterialType.LandscapeBoard).getItems<LandscapeBoard>()
    for (const item of landscapeBoardItems) {
      this.addBoardToLandscape(landscapeBoards[item.id], item.location)
    }
    const oceanBoardItem = this.material(MaterialType.OceanBoard).getItem<OceanBoard>()
    if (oceanBoardItem) {
      this.addBoardToLandscape(oceanBoards[oceanBoardItem.id], oceanBoardItem.location)
    }

    const trophyBoardItem = this.material(MaterialType.TrophyBoard).getItem<OceanBoard>()
    if (trophyBoardItem) {
      this.addBoardToLandscape(trophyBoards[trophyBoardItem.id], trophyBoardItem.location)
    }
  }

  private addBoardToLandscape(board: Hex[][], location: Location) {
    for (let y = 0; y < board.length; y++) {
      const line = board[y]
      for (let x = 0; x < line.length; x++) {
        this.addLandToLandscape(line[x], { x, y }, location)
      }
    }
  }

  private addLandToLandscape(hex: Hex, coordinates: XYCoordinates, location: Location) {
    if (hex === undefined) return
    const rotatedCoordinates = hexRotate(coordinates, location.rotation as number, HexGridSystem.EvenQ)
    const { x, y } = hexTranslate(rotatedCoordinates, location as XYCoordinates, HexGridSystem.EvenQ)
    while (y < this.yMin) {
      this.landscape.unshift([])
      this.yMin--
    }
    while (x < this.xMin) {
      for (const line of this.landscape) {
        line.unshift(undefined)
      }
      this.xMin--
    }
    if (!this.landscape[y - this.yMin]) {
      this.landscape[y - this.yMin] = []
    }
    this.landscape[y - this.yMin][x - this.xMin] = hex
  }
}
