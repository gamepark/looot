import { LocationType } from '@gamepark/looot/material/LocationType'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { bagLocator } from './BagLocator'
import { fjordBoardHexSpaceLocator } from './FjordBoardHexSpaceLocator'
import { fjordBoardLocator } from './FjordBoardLocator'
import { landscapeLocator } from './LandscapeLocator'
import { longshipTilesPileLocator } from './longshipTilesPileLocator'
import { oceanBoardHexSpaceLocator } from './OceanBoardHexSpaceLocator'
import { playerResourcesIdleLayoutLocator } from './PlayerResourcesIdleLayoutLocator'
import { playerikingPileLocator } from './PlayerVikingPileLocator'
import { resourceTilesPileLocator } from './ResourceTilesPileLocator'
import { trophyBoardHexSpaceLocator } from './TrophyBoardHexSpaceLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.Landscape]: landscapeLocator,
  [LocationType.OceanBoardHexSpace]: oceanBoardHexSpaceLocator,
  [LocationType.TrophyBoardHexSpace]: trophyBoardHexSpaceLocator,
  [LocationType.LongshipTilesPile]: longshipTilesPileLocator,
  [LocationType.ResourceTilesPile]: resourceTilesPileLocator,
  [LocationType.Bag]: bagLocator,
  [LocationType.FjordBoard]: fjordBoardLocator,
  [LocationType.FjordBoardHexSpace]: fjordBoardHexSpaceLocator,
  [LocationType.PlayerVikingPile]: playerikingPileLocator,
  [LocationType.PlayerResourcesIdleLayout]: playerResourcesIdleLayoutLocator
}
