import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'
import { Resource } from './Resource'

export enum LongshipTile {
  Castle31 = 130,
  Castle32,
  Castle33,
  Castle41 = 140,
  Gold21 = 220,
  Gold22,
  Gold23,
  Gold31 = 230,
  Watchtower11 = 310,
  Watchtower12,
  Watchtower13,
  Watchtower21 = 320,
  Watchtower22,
  Sheep11 = 410,
  Sheep12,
  Sheep13,
  Sheep14,
  Sheep21 = 420,
  Sheep22,
  Wood11 = 510,
  Wood12,
  Wood13,
  Wood14,
  Wood15,
  Wood21 = 520,
  House11 = 610,
  House12,
  House13,
  House14,
  House21 = 620
}
export enum LongshipTileType {
  Castle = 1,
  Gold,
  Watchtower,
  Sheep,
  Wood,
  House
}

export const getLongshipType = (tile: LongshipTile): LongshipTileType => Math.floor(tile / 100) as LongshipTileType
export const getLongshipValue = (tile: LongshipTile): LongshipTileType => Math.floor(tile / 10) % 10

export const longshipTiles: LongshipTile[] = shuffle(getEnumValues(LongshipTile))


export const getLongshipNeededTiles = (id: number) => {
  const longshipResources = {
    [LongshipTile.Castle31]: [Resource.Axe, Resource.Axe, Resource.Wood],
    [LongshipTile.Castle32]: [Resource.Wood, Resource.Wood, Resource.Wood],
    [LongshipTile.Castle33]: [Resource.Sheep, Resource.Sheep, Resource.Axe],
    [LongshipTile.Castle41]: [Resource.Gold, Resource.Gold, Resource.Axe],
    [LongshipTile.Gold21]: [Resource.Gold, Resource.Wood, Resource.Wood],
    [LongshipTile.Gold22]: [Resource.Gold, Resource.Wood, Resource.Sheep],
    [LongshipTile.Gold23]: [Resource.Gold, Resource.Wood, Resource.Axe],
    [LongshipTile.Gold31]: [Resource.Gold, Resource.Sheep, Resource.Sheep],
    [LongshipTile.Watchtower11]: [Resource.Wood, Resource.Wood, Resource.Sheep],
    [LongshipTile.Watchtower12]: [Resource.Axe, Resource.Axe, Resource.Gold],
    [LongshipTile.Watchtower13]: [Resource.Axe, Resource.Wood, Resource.Wood],
    [LongshipTile.Watchtower21]: [Resource.Wood, Resource.Wood, Resource.Gold],
    [LongshipTile.Watchtower22]: [Resource.Sheep, Resource.Sheep, Resource.Gold],
    [LongshipTile.Sheep11]: [Resource.Sheep, Resource.Axe, Resource.Gold],
    [LongshipTile.Sheep12]: [Resource.Sheep, Resource.Wood, Resource.Wood],
    [LongshipTile.Sheep13]: [Resource.Sheep, Resource.Wood, Resource.Axe],
    [LongshipTile.Sheep14]: [Resource.Sheep, Resource.Axe, Resource.Axe],
    [LongshipTile.Sheep21]: [Resource.Sheep, Resource.Gold, Resource.Wood],
    [LongshipTile.Sheep22]: [Resource.Sheep, Resource.Gold, Resource.Gold],
    [LongshipTile.Wood11]: [Resource.Axe, Resource.Axe, Resource.Wood],
    [LongshipTile.Wood12]: [Resource.Sheep, Resource.Sheep, Resource.Wood],
    [LongshipTile.Wood13]: [Resource.Axe, Resource.Gold, Resource.Wood],
    [LongshipTile.Wood14]: [Resource.Axe, Resource.Sheep, Resource.Wood],
    [LongshipTile.Wood15]: [Resource.Gold, Resource.Sheep, Resource.Wood],
    [LongshipTile.Wood21]: [Resource.Gold, Resource.Gold, Resource.Wood],
    [LongshipTile.House11]: [Resource.Sheep, Resource.Sheep, Resource.Wood],
    [LongshipTile.House12]: [Resource.Sheep, Resource.Axe, Resource.Axe],
    [LongshipTile.House13]: [Resource.Axe, Resource.Axe, Resource.Axe],
    [LongshipTile.House14]: [Resource.Axe, Resource.Axe, Resource.Gold],
    [LongshipTile.House21]: [Resource.Sheep, Resource.Sheep, Resource.Sheep],
  }
  return longshipResources[id as LongshipTile]
}