import { Resource } from './Resource'

export enum Longship {
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

export enum LongshipType {
  Castle = 1,
  Gold,
  Watchtower,
  Sheep,
  Wood,
  House
}

export const getLongshipType = (tile: Longship): LongshipType => Math.floor(tile / 100) as LongshipType
export const getLongshipValue = (tile: Longship): LongshipType => Math.floor(tile / 10) % 10

export const longshipRequirements: Record<Longship, Resource[]> = {
  [Longship.Castle31]: [Resource.Axe, Resource.Axe, Resource.Wood],
  [Longship.Castle32]: [Resource.Wood, Resource.Wood, Resource.Wood],
  [Longship.Castle33]: [Resource.Sheep, Resource.Sheep, Resource.Axe],
  [Longship.Castle41]: [Resource.Gold, Resource.Gold, Resource.Axe],
  [Longship.Gold21]: [Resource.Gold, Resource.Wood, Resource.Wood],
  [Longship.Gold22]: [Resource.Gold, Resource.Wood, Resource.Sheep],
  [Longship.Gold23]: [Resource.Gold, Resource.Wood, Resource.Axe],
  [Longship.Gold31]: [Resource.Gold, Resource.Sheep, Resource.Sheep],
  [Longship.Watchtower11]: [Resource.Wood, Resource.Wood, Resource.Sheep],
  [Longship.Watchtower12]: [Resource.Axe, Resource.Axe, Resource.Gold],
  [Longship.Watchtower13]: [Resource.Axe, Resource.Wood, Resource.Wood],
  [Longship.Watchtower21]: [Resource.Wood, Resource.Wood, Resource.Gold],
  [Longship.Watchtower22]: [Resource.Sheep, Resource.Sheep, Resource.Gold],
  [Longship.Sheep11]: [Resource.Sheep, Resource.Axe, Resource.Gold],
  [Longship.Sheep12]: [Resource.Sheep, Resource.Wood, Resource.Wood],
  [Longship.Sheep13]: [Resource.Sheep, Resource.Wood, Resource.Axe],
  [Longship.Sheep14]: [Resource.Sheep, Resource.Axe, Resource.Axe],
  [Longship.Sheep21]: [Resource.Sheep, Resource.Gold, Resource.Wood],
  [Longship.Sheep22]: [Resource.Sheep, Resource.Gold, Resource.Gold],
  [Longship.Wood11]: [Resource.Axe, Resource.Axe, Resource.Wood],
  [Longship.Wood12]: [Resource.Sheep, Resource.Sheep, Resource.Wood],
  [Longship.Wood13]: [Resource.Axe, Resource.Gold, Resource.Wood],
  [Longship.Wood14]: [Resource.Axe, Resource.Sheep, Resource.Wood],
  [Longship.Wood15]: [Resource.Gold, Resource.Sheep, Resource.Wood],
  [Longship.Wood21]: [Resource.Gold, Resource.Gold, Resource.Wood],
  [Longship.House11]: [Resource.Sheep, Resource.Sheep, Resource.Wood],
  [Longship.House12]: [Resource.Sheep, Resource.Axe, Resource.Axe],
  [Longship.House13]: [Resource.Axe, Resource.Axe, Resource.Axe],
  [Longship.House14]: [Resource.Axe, Resource.Axe, Resource.Gold],
  [Longship.House21]: [Resource.Sheep, Resource.Sheep, Resource.Sheep]
}
