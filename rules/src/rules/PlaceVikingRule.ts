import { isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BuildingHelper } from './helpers/BuildingHelper'
import { LandscapeHelper } from './helpers/LandscapeHelper'
import { RuleId } from './RuleId'

export class PlaceVikingRule extends PlayerTurnRule {
  landscapeHelper = new LandscapeHelper(this.game)
  buildingHelper = new BuildingHelper(this.game)
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    this.landscapeHelper.getPossiblePlaces().forEach((place) => {
      moves.push(...this.playerVikings.moveItems(place))
    })
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Viking)(move)) {
      const resource = this.landscapeHelper.getLandscapeCaseType(move.location.x ?? 0, move.location.y ?? 0)
      moves.push(
        this.material(MaterialType.ResourceTile).createItem({ id: resource, location: { type: LocationType.PlayerResourcesIdleLayout, player: this.player } })
      )
      moves.push(...this.buildingHelper.checkAndGetHouse(move.location as Location))
      moves.push(...this.buildingHelper.checkAndGetTower())
      moves.push(...this.buildingHelper.checkAndGetCastle())
      moves.push(this.startRule(RuleId.PlaceResource))
    }
    return moves
  }

  get playerVikings() {
    return this.material(MaterialType.Viking).location(LocationType.PlayerVikingPile).player(this.player)
  }
}
