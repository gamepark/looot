import { MaterialGameSetup, XYCoordinates } from '@gamepark/rules-api'
import { sample } from 'lodash'
import { LoootOptions } from './LoootOptions'
import { LoootRules } from './LoootRules'
import { BuildingTile } from './material/BuildingTile'
import { altarConstructionSites, palaceConstructionSites, portConstructionSites } from './material/ConstructionSiteTile'
import { getLandscapeBoard, LandscapeBoard } from './material/LandscapeBoard'
import { LocationType } from './material/LocationType'
import { longshipTiles } from './material/LongshipTile'
import { MaterialType } from './material/MaterialType'
import { getLandscapeBoardRepresentation } from './material/representation/landscapeBoard'
import { shields } from './material/Shield'
import { trophies } from './material/TrophyTile'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class LoootSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, LoootOptions> {
  Rules = LoootRules

  setupMaterial(_options: LoootOptions) {
    this.setupLandscapeBoards()
    this.setupOceanBoard()
    this.setupTrophyBoard()
    this.setupPlayers()
  }

  setupOceanBoard() {
    this.material(MaterialType.OceanBoard).createItem({
      location: { type: LocationType.OceanBoard, rotation: sample([false, true]), parent: this.players.length - 1 }
    })
    longshipTiles.forEach((tile) => {
      this.material(MaterialType.LongshipTile).createItem({
        location: { type: LocationType.LongshipTilesPile, rotation: true },
        id: tile
      })
    })
    for (let i = 0; i < 5; i++) {
      this.material(MaterialType.LongshipTile)
        .location(LocationType.LongshipTilesPile)
        .moveItem(() => ({ type: LocationType.OceanBoardHexSpace, rotation: false, x: i, y: 0 }))
    }
  }

  setupTrophyBoard() {
    this.material(MaterialType.TrophyBoard).createItem({
      location: { type: LocationType.TrophyBoard, rotation: sample([false, true]) }
    })
    trophies.forEach((trophy, index) => {
      this.material(MaterialType.TrophyTile).createItem({
        location: { type: LocationType.TrophyBoardHexSpace, rotation: true, x: index, y: 0 },
        id: trophy
      })
    })
  }

  setupLandscapeBoards() {
    getLandscapeBoard(this.players.length).forEach((board, index) => {
      const id = index * 10 + sample([0, 1, 2])
      this.material(MaterialType.LandscapeBoard).createItem({ id: board, location: { type: LocationType.LandscapeBoard, rotation: sample([false, true]), id } })
    })

    const boards = this.material(MaterialType.LandscapeBoard).getItems()

    boards.forEach((board, index) => {
      const representation = getLandscapeBoardRepresentation(board.id as LandscapeBoard)

      if (!representation) return

      this.createBuildingTiles(representation.houses(board.location), BuildingTile.House, index, 2)
      this.createBuildingTiles(representation.towers(board.location), BuildingTile.Watchtower, index, 2)
      this.createBuildingTiles(representation.castles(board.location), BuildingTile.Castle, index, 3)
    })
  }

  createBuildingTiles(tilesLocations: XYCoordinates[], tileId: BuildingTile, parent: number, quantity: number) {
    tilesLocations.forEach((tileLocation) => {
      this.material(MaterialType.BuildingTile).createItem({
        id: tileId,
        location: { ...tileLocation, type: LocationType.LandscapeBoardHexSpace, parent },
        quantity
      })
    })
  }

  setupPlayers() {
    this.players.forEach((player) => {
      this.material(MaterialType.FjordBoard).createItem({ id: player, location: { type: LocationType.FjordBoard, player } })
      this.material(MaterialType.Viking).createItem({ id: player, location: { type: LocationType.PlayerVikingPile, player }, quantity: 13 })
      this.setupShield(player)
      this.setupConstructionSite(player)
    })
  }

  setupShield(player: PlayerColor) {
    shields.forEach((shield, index) => {
      const id = +`${player}${shield}`
      this.material(MaterialType.Shield).createItem({ id, location: { type: LocationType.FjordBoardHexSpace, x: index, y: 0, player } })
    })
  }

  setupConstructionSite(player: PlayerColor) {
    this.material(MaterialType.ConstructionSiteTile).createItem({
      id: portConstructionSites[player],
      location: { type: LocationType.FjordBoardHexSpace, x: 5, y: 1, player }
    })
    this.material(MaterialType.ConstructionSiteTile).createItem({
      id: altarConstructionSites[player],
      location: { type: LocationType.FjordBoardHexSpace, x: 1, y: 2, player }
    })
    this.material(MaterialType.ConstructionSiteTile).createItem({
      id: palaceConstructionSites[player],
      location: { type: LocationType.FjordBoardHexSpace, x: 4, y: 4, player }
    })
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
