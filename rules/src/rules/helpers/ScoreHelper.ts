import { MaterialRulesPart } from '@gamepark/rules-api'
import { Building } from '../../material/Building'
import { ConstructionSite, ConstructionSiteTileType, getConstructionSiteType } from '../../material/ConstructionSite'
import { LocationType } from '../../material/LocationType'
import { getLongshipType, getLongshipValue, Longship, LongshipType } from '../../material/Longship'
import { MaterialType } from '../../material/MaterialType'
import { Resource } from '../../material/Resource'
import { Trophy, trophyValue } from '../../material/Trophy'

export class ScoreHelper extends MaterialRulesPart {

  getTotalScore(player: number) {
    return this.getResourcesScore(player) + this.getBuildingssScore(player) + this.getConstructionSiteScore(player) + this.getTrophyScore(player) - this.getNotReturnedLongshipMalus(player)
  }

  getResourcesScore(player: number) {
    return this.getSheepValue(player) * this.getNbSheep(player) + this.getWoodValue(player) * this.getNbWood(player) + this.getGoldValue(player) * this.getNbGold(player)
  }

  getBuildingssScore(player: number) {
    return this.getHouseValue(player) * this.getNbHouse(player) + this.getWatchTowerValue(player) * this.getNbWatchTower(player) + this.getCastleValue(player) * this.getNbCastle(player)
  }

  getNotReturnedLongshipMalus(player: number) {
    return (
      this.material(MaterialType.LongshipTile)
        .location(LocationType.FjordBoardHexSpace)
        .rotation((r) => r === false || r === undefined)
        .player(player).length * 5
    )
  }

  getTrophyScore(player: number) {
    return this.material(MaterialType.TrophyTile)
      .location(LocationType.FjordBoardHexSpace)
      .player(player)
      .getItems()
      .map((it) => trophyValue[it.id as Trophy])
      .reduce((acc, cur) => acc + cur, 0)
  }

  getConstructionSiteScore(player: number) {
    let score = 0

    if (this.checkIfConstructionSiteIsReturned(player, ConstructionSiteTileType.Port)) score += 5
    if (this.checkIfConstructionSiteIsReturned(player, ConstructionSiteTileType.Altar)) score += 7
    if (this.checkIfConstructionSiteIsReturned(player, ConstructionSiteTileType.Palace)) score += 9

    return score
  }

  getNbCastle(player: number) {
    return this.getNbTile(player, MaterialType.BuildingTile, Building.Castle)
  }

  getCastleValue(player: number) {
    return this.getMultipleValue(player, LongshipType.Castle, 4)
  }

  getNbWatchTower(player: number) {
    return this.getNbTile(player, MaterialType.BuildingTile, Building.Watchtower)
  }

  getWatchTowerValue(player: number) {
    return this.getMultipleValue(player, LongshipType.Watchtower, 2)
  }

  getNbHouse(player: number) {
    return this.getNbTile(player, MaterialType.BuildingTile, Building.House)
  }

  getHouseValue(player: number) {
    return this.getMultipleValue(player, LongshipType.House, 1)
  }

  getNbGold(player: number) {
    return this.getNbTile(player, MaterialType.ResourceTile, Resource.Gold)
  }

  getGoldValue(player: number) {
    return this.getMultipleValue(player, LongshipType.Gold, 2)
  }

  getNbWood(player: number) {
    return this.getNbTile(player, MaterialType.ResourceTile, Resource.Wood)
  }

  getWoodValue(player: number) {
    return this.getMultipleValue(player, LongshipType.Wood, 1)
  }

  getNbSheep(player: number) {
    return this.getNbTile(player, MaterialType.ResourceTile, Resource.Sheep)
  }

  getSheepValue(player: number) {
    return this.getMultipleValue(player, LongshipType.Sheep, 1)
  }

  getNbTile(player: number, materialType: MaterialType, resourceType: Resource | Building) {
    return this.material(materialType)
      .location(LocationType.FjordBoardHexSpace)
      .player(player)
      .filter((it) => it.id === resourceType).length
  }

  getMultipleValue(player: number, longShipType: LongshipType, baseValue: number) {
    return this.material(MaterialType.LongshipTile)
      .location(LocationType.FjordBoardHexSpace)
      .rotation((r) => r === true)
      .player(player)
      .getItems()
      .filter((it) => getLongshipType(it.id as Longship) === longShipType)
      .map((it) => getLongshipValue(it.id as Longship))
      .reduce((old, curr) => old + curr, baseValue)
  }

  checkIfConstructionSiteIsReturned(player: number, type: ConstructionSiteTileType) {
    return (
      this.material(MaterialType.ConstructionSiteTile)
        .location(LocationType.FjordBoardHexSpace)
        .rotation((r) => r === true)
        .player(player)
        .filter((it) => getConstructionSiteType(it.id as ConstructionSite) === type).length === 1
    )
  }
}
