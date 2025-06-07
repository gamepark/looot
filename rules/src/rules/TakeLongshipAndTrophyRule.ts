import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { Longship } from '../material/Longship'
import { MaterialType } from '../material/MaterialType'
import { Resource } from '../material/Resource'
import { CustomMoveType } from './CustomMove'
import { FjordBoardHelper } from './helpers/FjordBoardHelper'
import { MemoryType } from './Memory'
import { RuleId } from './RuleId'

export class TakeLongshipAndTrophyRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!this.remind(MemoryType.LongshipTaked)) {
      new FjordBoardHelper(this.game).getPossiblePlaces().forEach((place) => {
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
    if (isMoveItemType(MaterialType.LongshipTile)(move)) {
      const oldLongshipLocation = this.material(MaterialType.LongshipTile).index(move.itemIndex).getItem()?.location
      if (oldLongshipLocation?.type === LocationType.Landscape) {
        this.memorize(MemoryType.LongshipTaked, oldLongshipLocation)
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LongshipTile)(move) && move.location.type === LocationType.FjordBoardHexSpace && !move.location.rotation) {
      const longshipTile = this.material(move.itemType).index(move.itemIndex)
      if (new FjordBoardHelper(this.game).isLongshipComplete(longshipTile.getItem<Longship>()!.id, move.location as XYCoordinates)) {
        moves.push(longshipTile.rotateItem(true))
      }
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      const longshipTaked: Location | undefined = this.remind(MemoryType.LongshipTaked)
      if(longshipTaked) {
        moves.push(
          this.material(MaterialType.LongshipTile)
            .location(LocationType.InsideBag)
            .maxBy((item) => item.location.x!)
            .moveItem(longshipTaked)
        )
      }
      moves.push(this.startNext())
    }
    return moves
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
    return this.material(MaterialType.LongshipTile).location(LocationType.Landscape)
  }

  get eligiblesTrophies() {
    const nbPlayerAxes = this.material(MaterialType.ResourceTile).location(LocationType.FjordBoardHexSpace).player(this.player).id(Resource.Axe).length
    return this.material(MaterialType.TrophyTile)
      .location(LocationType.Landscape)
      .filter((it) => it.id! <= nbPlayerAxes)
  }

  get playerTrophy() {
    return this.material(MaterialType.TrophyTile).location(LocationType.FjordBoardHexSpace).player(this.player)
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
