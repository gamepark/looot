import { getEnumValues, HexGridSystem, hexRotate, hexTranslate, MaterialGameSetup, XYCoordinates } from '@gamepark/rules-api'
import { sample, shuffle } from 'lodash'
import { LoootOptions } from './LoootOptions'
import { LoootRules } from './LoootRules'
import { Building } from './material/Building'
import { altarConstructionSites, palaceConstructionSites, portConstructionSites } from './material/ConstructionSiteTile'
import { LandscapeBoard } from './material/LandscapeBoard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { OceanBoard } from './material/OceanBoard'
import { shields } from './material/Shield'
import { TrophyBoard } from './material/TrophyBoard'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class LoootSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, LoootOptions> {
  Rules = LoootRules

  setupMaterial(_options: LoootOptions) {
    this.setupLandscapeBoards()
    this.setupPlayers()
  }

  setupLandscapeBoards() {
    const boards = shuffle(getEnumValues(LandscapeBoard)).slice(0, this.players.length)
    const firstBoardLocation = this.getLandscapeBoardLocation({ x: 0, y: 0 }, 0)
    this.material(MaterialType.LandscapeBoard).createItem({ id: boards.pop(), location: firstBoardLocation })
    //this.material(MaterialType.LandscapeBoard).createItem({ id: boards.pop(), location: { type: LocationType.Landscape, x: 1, y: -3, rotation: 1 } })
    const availableEdges: LandscapeEdge[] = [
      { x: 0, y: 0, direction: 1 },
      { x: 0, y: 0, direction: 3, longSide: true },
      { x: 0, y: 0, direction: 5 }
    ]
    for (const board of boards) {
      const edge = popRandom(availableEdges)
      const rotation = Math.floor(Math.random() * 3) * 2 + (edge.direction % 2)
      const { x, y } = this.getNewLandscapeBoardCenter(edge, rotation)
      this.material(MaterialType.LandscapeBoard).createItem({ id: board, location: this.getLandscapeBoardLocation({ x, y }, rotation) })
      availableEdges.push(
        { x, y, direction: (edge.direction + 1) % 6, longSide: (edge.direction - rotation + 7) % 6 === 3 },
        { x, y, direction: (edge.direction + 5) % 6, longSide: (edge.direction - rotation + 5) % 6 === 3 }
      )
    }
    this.setupOceanBoard(popRandom(availableEdges))
    this.setupTrophyBoard(popRandom(availableEdges))

    this.material(MaterialType.BuildingTile).createItem({ id: Building.House, location: { type: LocationType.Landscape, x: 0, y: 0, rotation: 0 } })
    /*boards.forEach((board, index) => {
      const id = index * 10 + sample([0, 1, 2])
      this.material(MaterialType.LandscapeBoard).createItem({ id: board, location: { type: LocationType.LandscapeBoard, rotation: sample([false, true]), id } })
    })

    const boards2 = this.material(MaterialType.LandscapeBoard).getItems()

    boards2.forEach((board, index) => {
      const representation = getLandscapeBoardRepresentation(board.id as LandscapeBoard)

      if (!representation) return

      this.createBuildingTiles(representation.houses(board.location), BuildingTile.House, index, 2)
      this.createBuildingTiles(representation.towers(board.location), BuildingTile.Watchtower, index, 2)
      this.createBuildingTiles(representation.castles(board.location), BuildingTile.Castle, index, 3)
    })*/
  }

  getLandscapeBoardLocation(center: XYCoordinates, rotation: number) {
    const { x, y } = hexTranslate(center, hexRotate({ x: -3, y: -2 }, rotation, HexGridSystem.EvenQ), HexGridSystem.EvenQ)
    return { type: LocationType.Landscape, x, y, rotation }
  }

  getNewLandscapeBoardCenter(edge: LandscapeEdge, rotation: number) {
    const isLongSide = rotation === edge.direction
    // Move center of the tile 4 hex away in the direction
    const x = isLongSide !== edge.longSide ? 0 : sample([-1, 1])
    const y = isLongSide && edge.longSide ? -3 : -4
    const vector = hexRotate({ x, y }, edge.direction, HexGridSystem.EvenQ)
    return hexTranslate(edge, vector, HexGridSystem.EvenQ)
  }

  setupOceanBoard(edge: LandscapeEdge) {
    // TODO: the ocean board can overlap another board in rare scenarios. Loop on getSideTileLocation until the location is fine.
    this.material(MaterialType.OceanBoard).createItem({ id: sample(getEnumValues(OceanBoard)), location: this.getSideTileLocation(edge) })

    /*
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
    }*/
  }

  setupTrophyBoard(edge: LandscapeEdge) {
    // TODO: the trophy board can overlap another board in rare scenarios. Loop on getSideTileLocation until the location is fine.
    this.material(MaterialType.TrophyBoard).createItem({ id: sample(getEnumValues(TrophyBoard)), location: this.getSideTileLocation(edge) })
    /*trophies.forEach((trophy, index) => {
      this.material(MaterialType.TrophyTile).createItem({
        location: { type: LocationType.TrophyBoardHexSpace, rotation: true, x: index, y: 0 },
        id: trophy
      })
    })*/
  }

  getSideTileLocation(edge: LandscapeEdge) {
    const x = sample(edge.longSide ? [-3, -1, 1, 3] : [-2, 0, 2])
    const y = edge.longSide ? -2 : -3
    const vector = hexRotate({ x, y }, edge.direction, HexGridSystem.EvenQ)
    const tileCenter = hexTranslate(edge, vector, HexGridSystem.EvenQ)
    const locationCoordinates = hexTranslate(tileCenter, hexRotate({ x: -2, y: 0 }, edge.direction, HexGridSystem.EvenQ), HexGridSystem.EvenQ)
    return { type: LocationType.Landscape, ...locationCoordinates, rotation: edge.direction }
  }

  createBuildingTiles(tilesLocations: XYCoordinates[], tileId: Building, parent: number, quantity: number) {
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

type LandscapeEdge = {
  x: number
  y: number
  direction: number // 0: top - 1: top-right - 2: bottom right - 3: bottom - 4: bottom left - 5: top left
  longSide?: boolean
}

function popRandom<T>(array: T[]): T {
  const i = Math.floor(Math.random() * array.length)
  return array.splice(i, 1)[0]
}
