import { LocationType } from '@gamepark/looot/material/LocationType'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { bagLocator } from './BagLocator'
import { fjordBoardHexSpaceLocator } from './FjordBoardHexSpaceLocator'
import { fjordBoardLocator } from './FjordBoardLocator'
import { landscapeLocator } from './LandscapeLocator'
import { longshipsPileLocator } from './longshipsPileLocator'
import { playerBuildingIdleLayoutLocator } from './PlayerBuildingIdleLayoutLocator'
import { playerResourcesIdleLayoutLocator } from './PlayerResourcesIdleLayoutLocator'
import { playerikingPileLocator } from './PlayerVikingPileLocator'
import { resourceTilesDeckLocator } from './ResourceTilesDeckLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.Landscape]: landscapeLocator,
  [LocationType.InsideBag]: longshipsPileLocator,
  [LocationType.ResourceTilesDeck]: resourceTilesDeckLocator,
  [LocationType.Bag]: bagLocator,
  [LocationType.FjordBoard]: fjordBoardLocator,
  [LocationType.FjordBoardHexSpace]: fjordBoardHexSpaceLocator,
  [LocationType.PlayerVikingPile]: playerikingPileLocator,
  [LocationType.PlayerResourcesIdleLayout]: playerResourcesIdleLayoutLocator,
  [LocationType.PlayerBuildingIdleLayout]: playerBuildingIdleLayoutLocator
}
