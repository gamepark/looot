import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { MemoryType } from './Memory'
import { RuleId } from './RuleId'
import { FjordBoardHelper } from './helpers/FjordBoardHelper'

export class PlaceResourceRule extends PlayerTurnRule {
  fjordBoardHelper = new FjordBoardHelper(this.game)

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    this.fjordBoardHelper.getPossiblePlaces().forEach((place) => {
      this.playerResourceTiles.forEach((tile) => {
        moves.push(this.material(MaterialType.ResourceTile).index(tile).moveItem(place))
      })
      this.playerBuildingTiles.forEach((tile) => {
        moves.push(this.material(MaterialType.BuildingTile).index(tile).moveItem(place))
      })
      //moves.push(...this.playerBuildingTiles.moveItems(place))
    })
    return moves
  }

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    if (isMoveItemType(MaterialType.ResourceTile)(move)) {
      this.memorize(MemoryType.ResourcesToGet, (oldValue: number[]) => {
        const index = oldValue.findIndex((it) => it === move.itemIndex)
        if (index === -1) return oldValue
        return [...oldValue.slice(0, index), ...oldValue.slice(index + 1)]
      })
    }
    if (isMoveItemType(MaterialType.BuildingTile)(move)) {
      this.memorize(MemoryType.BuildingToGet, (oldValue: number[]) => {
        const index = oldValue.findIndex((it) => it === move.itemIndex)
        if (index === -1) return oldValue
        return [...oldValue.slice(0, index), ...oldValue.slice(index + 1)]
      })
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ResourceTile)(move) || isMoveItemType(MaterialType.BuildingTile)(move)) {
      moves.push(...this.fjordBoardHelper.checkConstructionSite())
      moves.push(...this.fjordBoardHelper.checkLongship())
    }
    if (this.playerResourceTiles.length === 0 && this.playerBuildingTiles.length === 0) {
      moves.push(this.startRule(RuleId.TakeLongship))
    }
    return moves
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
