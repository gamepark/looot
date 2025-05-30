import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { FjordBoardHelper } from './helper/FjordBoardHelper'

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
    if (isMoveItemType(MaterialType.ResourceTile)(move) || isMoveItemType(MaterialType.BuildingTile)(move)) {
      return [...this.fjordBoardHelper.checkConstructionSite(), ...this.fjordBoardHelper.checkLongship(), this.startRule(RuleId.PlaceResource)]
    }
    return [this.startRule(RuleId.PlaceResource)]
  }

  get playerResourceTiles() {
    return this.material(MaterialType.ResourceTile).location(LocationType.PlayerResourcesIdleLayout).player(this.player)
  }

  get playerBuildingTiles() {
    return this.material(MaterialType.BuildingTile).location(LocationType.PlayerResourcesIdleLayout).player(this.player)
  }
}
