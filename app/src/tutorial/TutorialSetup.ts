import { LoootSetup } from '@gamepark/looot/LoootSetup'
import { LocationType } from '@gamepark/looot/material/LocationType'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { OceanBoard } from '@gamepark/looot/material/OceanBoard'
import { TrophyBoard } from '@gamepark/looot/material/TrophyBoard'
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { getEnumValues } from '@gamepark/rules-api'
import { sample } from 'lodash'

export const me = PlayerColor.Blue
export const opponent = PlayerColor.Red

export class TutorialSetup extends LoootSetup {
  setupLandscapeBoards() {
    const firstBoardLocation = this.getLandscapeBoardLocation({ x: 0, y: 0 }, 0)
    this.material(MaterialType.LandscapeBoard).createItem({ id: 1, location: firstBoardLocation })
    const secondBoardLocation = this.getLandscapeBoardLocation({ x: 0, y: 4 }, 1)
    this.material(MaterialType.LandscapeBoard).createItem({ id: 7, location: secondBoardLocation })
    const trophyBoardLocation = { type: LocationType.Landscape, x: 4, y: 4, rotation: 2 }
    this.createBuildingTiles()
    this.material(MaterialType.TrophyBoard).createItem({ id: sample(getEnumValues(TrophyBoard)), location: trophyBoardLocation })
    this.createTrophyTiles(trophyBoardLocation)
    const oceanBoardLocation = { type: LocationType.Landscape, x: -4, y: 0, rotation: 5 }
    this.material(MaterialType.OceanBoard).createItem({ id: OceanBoard.OceanBoard1, location: oceanBoardLocation })
    this.createLongshipTiles(oceanBoardLocation)
  }
}
