import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { FjordBoardHelper } from './helpers/FjordBoardHelper'

export class PlaceResourceRule extends PlayerTurnRule {
  fjordBoardHelper = new FjordBoardHelper(this.game)

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    this.fjordBoardHelper.getPossiblePlaces().forEach((place) => {
      moves.push(...this.playerResourceTiles.moveItems(place))
      moves.push(...this.playerBuildingTiles.moveItems(place))
    })
    return moves
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
    return this.material(MaterialType.ResourceTile).location(LocationType.PlayerResourcesIdleLayout).player(this.player)
  }

  get playerBuildingTiles() {
    return this.material(MaterialType.BuildingTile).location(LocationType.PlayerBuildingIdleLayout).player(this.player)
  }
}
