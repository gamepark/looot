import { LoootSetup } from '@gamepark/looot/LoootSetup'
import { ConstructionSite, palaceConstructionSites, portConstructionSites } from '@gamepark/looot/material/ConstructionSite'
import { LocationType } from '@gamepark/looot/material/LocationType'
import { Longship } from '@gamepark/looot/material/Longship'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { OceanBoard } from '@gamepark/looot/material/OceanBoard'
import { TrophyBoard } from '@gamepark/looot/material/TrophyBoard'
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { getEnumValues, HexGridSystem, hexRotate, hexTranslate, XYCoordinates } from '@gamepark/rules-api'
import { sample, shuffle } from 'lodash'

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

  createLongshipTiles(oceanBoardLocation: XYCoordinates & { rotation: number }) {
    const othersLongships = shuffle(getEnumValues(Longship).slice(5))
    const longships = [Longship.Castle31, Longship.Sheep11, Longship.Watchtower21, Longship.Watchtower12, Longship.Watchtower11, ...othersLongships]
    const longshipTiles = longships.map((longship) => ({ id: longship, location: { type: LocationType.InsideBag } }))
    this.material(MaterialType.LongshipTile).createItems(longshipTiles)

    for (let i = 0; i < 5; i++) {
      const rotated = hexRotate({ x: i, y: 0 }, oceanBoardLocation.rotation, HexGridSystem.EvenQ)
      const { x, y } = hexTranslate(rotated, oceanBoardLocation, HexGridSystem.EvenQ)
      this.material(MaterialType.LongshipTile)
        .location(LocationType.InsideBag)
        .moveItem(() => ({ type: LocationType.Landscape, x, y, rotation: 0 }))
    }
  }

  setupConstructionSite(player: PlayerColor) {
    if (player === me) {
      this.material(MaterialType.ConstructionSiteTile).createItem({
        id: portConstructionSites[player],
        location: { type: LocationType.FjordBoardHexSpace, x: 5, y: 1, player }
      })
      this.material(MaterialType.ConstructionSiteTile).createItem({
        id: ConstructionSite.Altar5,
        location: { type: LocationType.FjordBoardHexSpace, x: 1, y: 2, player }
      })
      this.material(MaterialType.ConstructionSiteTile).createItem({
        id: palaceConstructionSites[player],
        location: { type: LocationType.FjordBoardHexSpace, x: 4, y: 4, player }
      })
    } else {
      super.setupConstructionSite(player)
    }
  }
}
