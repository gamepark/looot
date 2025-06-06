import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getShieldType, Shield } from '../material/Shield'
import { LandscapeHelper } from './helpers/LandscapeHelper'
import { MemoryType } from './Memory'
import { RuleId } from './RuleId'

export class PlaceVikingRule extends PlayerTurnRule {
  landscapeHelper = new LandscapeHelper(this.game)

  onRuleStart(): MaterialMove[] {
    if (this.playerVikings.length === 0) {
      return [this.startPlayerTurn(RuleId.PlaceViking, this.nextPlayer)]
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    this.landscapeHelper.getPossiblePlaces(this.selectedShields?.includes(Shield.PlaceOnOccupiedSpace) ?? false).forEach((place) => {
      moves.push(this.playerVikings.moveItem(place))
    })
    moves.push(...this.playerShields.moveItems((item) => ({ ...item.location, rotation: true })))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Shield)(move)) {
      const shieldId: number | undefined = this.material(MaterialType.Shield).index(move.itemIndex).getItem()?.id
      if (shieldId === undefined) return []
      const shieldType = getShieldType(shieldId)
      this.memorize(MemoryType.PlayerSelectedShield, (oldValue?: Shield[]) => (oldValue ? [...oldValue, shieldType] : [shieldType]), this.player)
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Viking)(move)) {
      const resource = this.landscapeHelper.getLand(move.location as XYCoordinates)
      if (resource) {
        this.memorize<number[]>(MemoryType.ResourcesToGet, (oldValue = []) => [...oldValue, resource])
        if (this.selectedShields?.includes(Shield.DoubleGain)) {
          this.memorize<number[]>(MemoryType.ResourcesToGet, (oldValue = []) => [...oldValue, resource])
        }
      }
      this.memorize<number[]>(MemoryType.BuildingToGet, (oldValue = []) => [
        ...oldValue,
        ...this.landscapeHelper.getHousesAround(move.location as XYCoordinates).getIndexes(),
        ...this.landscapeHelper.getWatchtowersToTake(this.player),
        ...this.landscapeHelper.getCastlesToTake(this.player)
      ])
      if (this.selectedShields?.includes(Shield.PlayAgain) && this.playerVikings.length) {
        moves.push(this.startRule(RuleId.PlaceViking))
      } else {
        moves.push(this.startRule(RuleId.PlaceResource))
      }
    }
    return moves
  }

  onRuleEnd(): MaterialMove[] {
    this.forget(MemoryType.PlayerSelectedShield, this.player)
    return []
  }

  get playerVikings() {
    return this.material(MaterialType.Viking).location(LocationType.PlayerVikingPile).player(this.player)
  }

  get playerShields() {
    return this.material(MaterialType.Shield)
      .location(LocationType.FjordBoardHexSpace)
      .player(this.player)
      .rotation(undefined)
      .filter((it) => getShieldType(it.id as number) !== Shield.PlaceOnOccupiedSpace || this.vikingsOnLandscape.length > 0)
  }

  get vikingsOnLandscape() {
    return this.material(MaterialType.Viking).location(LocationType.Landscape).getItems()
  }

  get selectedShields(): Shield[] | undefined {
    return this.remind(MemoryType.PlayerSelectedShield, this.player) ?? []
  }
}
