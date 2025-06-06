import { isMoveItem, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MemoryType } from './Memory'
import { RuleId } from './RuleId'
import { FjordBoardHelper } from './helpers/FjordBoardHelper'

export class PlaceResourceRule extends PlayerTurnRule {
  fjordBoardHelper = new FjordBoardHelper(this.game)

  onRuleStart(): MaterialMove[] {
    const noMorePlacesOnBoard = this.fjordBoardHelper.getPossiblePlaces().length === 0
    if (noMorePlacesOnBoard) {
      return [this.startRule(RuleId.TakeLongshipAndTrophy)]
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    this.fjordBoardHelper.getPossiblePlaces().forEach((place) => {
      this.playerResourceTiles.forEach((tile) => {
        moves.push(this.material(MaterialType.ResourceTile).id(tile).moveItem(place, 1))
      })
      this.playerBuildingTiles.forEach((tile) => {
        moves.push(this.material(MaterialType.BuildingTile).location(LocationType.Landscape).index(tile).moveItem(place))
      })
      //moves.push(...this.playerBuildingTiles.moveItems(place))
    })
    return moves
  }

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    if (isMoveItemType(MaterialType.ResourceTile)(move)) {
      this.memorize(MemoryType.ResourcesToGet, (oldValue: number[]) => {
        const index = oldValue.findIndex((it) => it === this.material(MaterialType.ResourceTile).index(move.itemIndex).getItem()?.id)
        if (index === -1) return oldValue
        return [...oldValue.slice(0, index), ...oldValue.slice(index + 1)]
      })
    }
    if (isMoveItemType(MaterialType.BuildingTile)(move)) {
      if (this.material(MaterialType.BuildingTile).location(LocationType.Landscape).index(move.itemIndex).getQuantity() - 1) {
        this.memorize(MemoryType.BuildingToGet, (oldValue: number[]) => {
          const index = oldValue.findIndex((it) => it === move.itemIndex)
          if (index === -1) return oldValue
          return [...oldValue.slice(0, index), ...oldValue.slice(index + 1)]
        })
      } else {
        this.memorize(MemoryType.BuildingToGet, (oldValue: number[]) => {
          return oldValue.filter((it) => it !== move.itemIndex)
        })
      }
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItem(move) && (move.itemType === MaterialType.ResourceTile || move.itemType === MaterialType.BuildingTile)) {
      moves.push(...this.fjordBoardHelper.completeConstructionSites(move.location as XYCoordinates))
      if (move.itemType === MaterialType.ResourceTile) {
        moves.push(...this.fjordBoardHelper.completeLongships(move.location as XYCoordinates))
      }
    }
    const noMoreResourcesOrBuildings = this.playerResourceTiles.length === 0 && this.playerBuildingTiles.length === 0
    const noMorePlacesOnBoard = this.fjordBoardHelper.getPossiblePlaces().length === 0
    if (noMoreResourcesOrBuildings || noMorePlacesOnBoard) {
      moves.push(this.startRule(RuleId.TakeLongshipAndTrophy))
    }
    return moves
  }

  onRuleEnd(): MaterialMove[] {
    this.forget(MemoryType.ResourcesToGet)
    this.forget(MemoryType.BuildingToGet)
    return []
  }

  get playerResourceTiles() {
    const resources: number[] | undefined = this.remind(MemoryType.ResourcesToGet) ?? []
    return resources
  }

  get playerBuildingTiles() {
    const buildings: number[] | undefined = this.remind(MemoryType.BuildingToGet) ?? []
    return buildings
  }
}
