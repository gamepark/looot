import { getEnumValues, HexGridSystem, hexRotate, hexTranslate, loopWithFuse, MaterialGameSetup, XYCoordinates } from '@gamepark/rules-api'
import { sample, shuffle } from 'lodash'
import { LoootOptions } from './LoootOptions'
import { LoootRules } from './LoootRules'
import { Building } from './material/Building'
import { altarConstructionSites, palaceConstructionSites, portConstructionSites } from './material/ConstructionSiteTile'
import { isBuilding, LandscapeBoard } from './material/LandscapeBoard'
import { LocationType } from './material/LocationType'
import { Longship } from './material/Longship'
import { MaterialType } from './material/MaterialType'
import { OceanBoard } from './material/OceanBoard'
import { resources } from './material/Resource'
import { shields } from './material/Shield'
import { Trophy } from './material/Trophy'
import { TrophyBoard } from './material/TrophyBoard'
import { PlayerColor } from './PlayerColor'
import { LandscapeHelper } from './rules/helpers/LandscapeHelper'
import { MemoryType } from './rules/Memory'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class LoootSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, LoootOptions> {
  Rules = LoootRules

  setupMaterial(_options: LoootOptions) {
    this.setupLandscapeBoards()
    this.setupPlayers()

    resources.forEach((resource) => {
      this.material(MaterialType.ResourceTile).createItem({
        quantity: 40,
        location: { type: LocationType.ResourceTilesDeck, id: resource },
        id: resource
      })
    })
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
    this.createBuildingTiles()
    this.setupTrophyBoard(popRandom(availableEdges))
    this.setupOceanBoard(popRandom(availableEdges))
  }

  getLandscapeBoardLocation(center: XYCoordinates, rotation: number) {
    const { x, y } = hexTranslate(center, hexRotate({ x: -3, y: -2 }, rotation, HexGridSystem.EvenQ), HexGridSystem.EvenQ)
    return { type: LocationType.Landscape, x, y, rotation }
  }

  getNewLandscapeBoardCenter(edge: LandscapeEdge, rotation: number) {
    const isLongSide = rotation === edge.direction
    // Move center of the tile 4 hex away in the direction
    const x = isLongSide !== !!edge.longSide ? 0 : sample([-1, 1])
    const y = isLongSide && edge.longSide ? -3 : -4
    const vector = hexRotate({ x, y }, edge.direction, HexGridSystem.EvenQ)
    return hexTranslate(edge, vector, HexGridSystem.EvenQ)
  }

  setupTrophyBoard(edge: LandscapeEdge) {
    loopWithFuse(() => {
      const location = this.getSideTileLocation(edge)
      this.material(MaterialType.TrophyBoard).createItem({ id: sample(getEnumValues(TrophyBoard)), location })

      if (new LandscapeHelper(this.game).overlap) {
        this.material(MaterialType.TrophyBoard).deleteItem()
        return true
      }

      const trophies = getEnumValues(Trophy)
      for (let i = 0; i < trophies.length; i++) {
        const trophy = trophies[i]
        const rotated = hexRotate({ x: i, y: 0 }, location.rotation, HexGridSystem.EvenQ)
        const { x, y } = hexTranslate(rotated, location, HexGridSystem.EvenQ)
        this.material(MaterialType.Trophy).createItem({
          id: trophy,
          location: { type: LocationType.Landscape, x, y, rotation: 0 }
        })
      }
      return false
    })
  }

  setupOceanBoard(edge: LandscapeEdge) {
    loopWithFuse(() => {
      const location = this.getSideTileLocation(edge)
      this.material(MaterialType.OceanBoard).createItem({ id: sample(getEnumValues(OceanBoard)), location })

      if (new LandscapeHelper(this.game).overlap) {
        this.material(MaterialType.OceanBoard).deleteItem()
        return true
      }

      const longships = shuffle(getEnumValues(Longship))
      const longshipTiles = longships.map((longship) => ({ id: longship, location: { type: LocationType.InsideBag } }))
      this.material(MaterialType.Longship).createItems(longshipTiles)

      for (let i = 0; i < 5; i++) {
        const rotated = hexRotate({ x: i, y: 0 }, location.rotation, HexGridSystem.EvenQ)
        const { x, y } = hexTranslate(rotated, location, HexGridSystem.EvenQ)
        this.material(MaterialType.Longship)
          .location(LocationType.InsideBag)
          .moveItem(() => ({ type: LocationType.Landscape, x, y, rotation: 0 }))
      }
      return false
    })
  }

  getSideTileLocation(edge: LandscapeEdge) {
    const x = sample(edge.longSide ? [-3, -1, 1, 3] : [-2, 0, 2])
    const y = edge.longSide ? -2 : -3
    const vector = hexRotate({ x, y }, edge.direction, HexGridSystem.EvenQ)
    const tileCenter = hexTranslate(edge, vector, HexGridSystem.EvenQ)
    const locationCoordinates = hexTranslate(tileCenter, hexRotate({ x: -2, y: 0 }, edge.direction, HexGridSystem.EvenQ), HexGridSystem.EvenQ)
    return { type: LocationType.Landscape, ...locationCoordinates, rotation: edge.direction }
  }

  createBuildingTiles() {
    const landscape = new LandscapeHelper(this.game).landscape
    const { xMin, yMin } = landscape
    for (let y = 0; y < landscape.grid.length; y++) {
      const line = landscape.grid[y]
      for (let x = 0; x < line.length; x++) {
        const land = line[x]
        if (land && isBuilding(land)) {
          this.material(MaterialType.BuildingTile).createItem({
            id: land,
            location: { type: LocationType.Landscape, x: x + xMin, y: y + yMin, rotation: 0 },
            quantity: land === Building.Castle ? 3 : 2
          })
        }
      }
    }
  }

  setupPlayers() {
    this.players.forEach((player) => {
      this.material(MaterialType.FjordBoard).createItem({ id: player, location: { type: LocationType.FjordBoard, player } })
      this.material(MaterialType.Viking).createItem({ id: player, location: { type: LocationType.PlayerVikingPile, player }, quantity: 13 })
      this.setupShield(player)
      this.setupConstructionSite(player)
      this.memorize(MemoryType.PlayerCastlesTaken, [], player)
      this.memorize(MemoryType.PlayerTowersTaken, [], player)
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
    this.startPlayerTurn(RuleId.PlaceViking, this.players[0])
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
