import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'

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
export const getLongshipValue = (tile: LongshipTile): LongshipTileType => Math.floor(tile / 10) as LongshipTileType

export const longshipTiles: LongshipTile[] = shuffle(getEnumValues(LongshipTile))
