import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Resource } from '../material/Resource'
import { CustomMoveType } from './CustomMove'
import { MemoryType } from './Memory'
import { RuleId } from './RuleId'
import { FjordBoardHelper } from './helpers/FjordBoardHelper'

export class TakeLongshipAndTrophyRule extends PlayerTurnRule {
  fjordBoardHelper = new FjordBoardHelper(this.game)

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!this.remind(MemoryType.LongshipTaked)) {
      this.fjordBoardHelper.getPossiblePlaces().forEach((place) => {
        moves.push(...this.longships.moveItems(place))
      })
    }
    if (this.playerTrophy.length === 0) {
      moves.push(...this.eligiblesTrophies.moveItems({ type: LocationType.FjordBoardHexSpace, x: 1, y: 1, player: this.player }))
    }
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Longship)(move)) {
      const oldLongshipLocation = this.material(MaterialType.Longship).index(move.itemIndex).getItem()?.location
      if (oldLongshipLocation?.type === LocationType.Landscape) {
        this.memorize(MemoryType.LongshipTaked, true)
        moves.push(
          this.material(MaterialType.Longship)
            .location(LocationType.InsideBag)
            .maxBy((item) => item.location.x!)
            .moveItem(oldLongshipLocation)
        )
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Longship)(move) && move.location.type === LocationType.FjordBoardHexSpace) {
      moves.push(...this.fjordBoardHelper.checkLongship())
    }
    console.log(this.eligiblesTrophies.length === 0)
    console.log(this.remind(MemoryType.LongshipTaked))
    if ((this.playerTrophy.length > 0 || this.eligiblesTrophies.length === 0) && this.remind(MemoryType.LongshipTaked)) {
      console.log('coucou')
      moves.push(this.startNext())
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.startNext()]
    }
    return []
  }

  onRuleEnd(): MaterialMove[] {
    this.forget(MemoryType.LongshipTaked)
    return []
  }

  startNext() {
    if (this.checkIfAllPlayerDoesntHaveVikingToPlace()) return this.endGame()
    return this.startPlayerTurn(RuleId.PlaceViking, this.nextPlayer)
  }

  get longships() {
    return this.material(MaterialType.Longship).location(LocationType.Landscape)
  }

  get eligiblesTrophies() {
    const nbPlayerAxes = this.material(MaterialType.ResourceTile).location(LocationType.FjordBoardHexSpace).player(this.player).id(Resource.Axe).length
    return this.material(MaterialType.Trophy)
      .location(LocationType.Landscape)
      .filter((it) => it.id! <= nbPlayerAxes)
  }

  get playerTrophy() {
    return this.material(MaterialType.Trophy).location(LocationType.FjordBoardHexSpace).player(this.player)
  }

  checkIfAllPlayerDoesntHaveVikingToPlace() {
    let allPlayerFinished = true
    this.game.players.forEach((player) => {
      if (this.material(MaterialType.Viking).location(LocationType.PlayerVikingPile).player(player).length > 0) {
        allPlayerFinished = false
      }
    })
    return allPlayerFinished
  }
}
