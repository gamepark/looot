import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Building } from '../../material/Building'
import { ConstructionSiteTile, ConstructionSiteTileType, getConstructionSiteType } from '../../material/ConstructionSiteTile'
import { LocationType } from '../../material/LocationType'
import { getLongshipType, getLongshipValue, LongshipTile, LongshipTileType } from '../../material/LongshipTile'
import { MaterialType } from '../../material/MaterialType'
import { Resource } from '../../material/Resource'
import { Trophy, trophyValue } from '../../material/Trophy'
import { MemoryType } from '../Memory'

export class ScoreHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player: number | undefined = game.rule?.player
  ) {
    super(game)
  }

  updateScore() {
    console.log(this.getTotalScore())
    this.memorize(MemoryType.PlayerScore, this.getTotalScore(), this.player)
  }

  getTotalScore() {
    return this.getResourcesScore() + this.getBuildingssScore() + this.getConstructionSiteScore() + this.getTrophyScore() - this.getNotReturnedLongshipMalus()
  }

  getResourcesScore() {
    return this.getSheepValue() * this.getNbSheep() + this.getWoodValue() * this.getNbWood() + this.getGoldValue() * this.getNbGold()
  }

  getBuildingssScore() {
    return this.getHouseValue() * this.getNbHouse() + this.getWatchTowerValue() * this.getNbWatchTower() + this.getCastleValue() * this.getNbCastle()
  }

  getNotReturnedLongshipMalus() {
    console.log(this.material(MaterialType.LongshipTile)
      .location(LocationType.FjordBoardHexSpace)
      .rotation((r) => r === false || r === undefined)
      .player(this.player).length)
    return (
      this.material(MaterialType.LongshipTile)
        .location(LocationType.FjordBoardHexSpace)
        .rotation((r) => r === false || r === undefined)
        .player(this.player).length * 5
    )
  }

  getTrophyScore() {
    return this.material(MaterialType.TrophyTile)
      .location(LocationType.FjordBoardHexSpace)
      .player(this.player)
      .getItems()
      .map((it) => trophyValue[it.id as Trophy])
      .reduce((acc, cur) => acc + cur, 0)
  }

  getConstructionSiteScore() {
    let score = 0

    if (this.checkIfConstructionSiteIsReturned(ConstructionSiteTileType.Port)) score += 5
    if (this.checkIfConstructionSiteIsReturned(ConstructionSiteTileType.Altar)) score += 7
    if (this.checkIfConstructionSiteIsReturned(ConstructionSiteTileType.Palace)) score += 9

    return score
  }

  getNbCastle() {
    return this.getNbTile(MaterialType.BuildingTile, Building.Castle)
  }

  getCastleValue() {
    return this.getMultipleValue(LongshipTileType.Castle, 4)
  }

  getNbWatchTower() {
    return this.getNbTile(MaterialType.BuildingTile, Building.Watchtower)
  }

  getWatchTowerValue() {
    return this.getMultipleValue(LongshipTileType.Watchtower, 2)
  }

  getNbHouse() {
    return this.getNbTile(MaterialType.BuildingTile, Building.House)
  }

  getHouseValue() {
    return this.getMultipleValue(LongshipTileType.House, 1)
  }

  getNbGold() {
    return this.getNbTile(MaterialType.ResourceTile, Resource.Gold)
  }

  getGoldValue() {
    return this.getMultipleValue(LongshipTileType.Gold, 2)
  }

  getNbWood() {
    return this.getNbTile(MaterialType.ResourceTile, Resource.Wood)
  }

  getWoodValue() {
    return this.getMultipleValue(LongshipTileType.Wood, 1)
  }

  getNbSheep() {
    return this.getNbTile(MaterialType.ResourceTile, Resource.Sheep)
  }

  getSheepValue() {
    return this.getMultipleValue(LongshipTileType.Sheep, 1)
  }

  getNbTile(materialType: MaterialType, resourceType: Resource | Building) {
    return this.material(materialType)
      .location(LocationType.FjordBoardHexSpace)
      .player(this.player)
      .filter((it) => it.id === resourceType).length
  }

  getMultipleValue(longShipType: LongshipTileType, baseValue: number) {
    return this.material(MaterialType.LongshipTile)
      .location(LocationType.FjordBoardHexSpace)
      .rotation((r) => r === true)
      .player(this.player)
      .getItems()
      .filter((it) => getLongshipType(it.id as LongshipTile) === longShipType)
      .map((it) => getLongshipValue(it.id as LongshipTile))
      .reduce((old, curr) => old + curr, baseValue)
  }

  checkIfConstructionSiteIsReturned(type: ConstructionSiteTileType) {
    return (
      this.material(MaterialType.ConstructionSiteTile)
        .location(LocationType.FjordBoardHexSpace)
        .rotation((r) => r === true)
        .player(this.player)
        .filter((it) => getConstructionSiteType(it.id as ConstructionSiteTile) === type).length === 1
    )
  }
}
