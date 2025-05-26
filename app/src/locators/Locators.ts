import { LocationType } from '@gamepark/looot/material/LocationType'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { bagLocator } from './BagLocator'
import { fjordBoardHexSpaceLocator } from './FjordBoardHexSpaceLocator'
import { fjordBoardLocator } from './FjordBoardLocator'
import { landscapeBoardHexSpaceLocator } from './LandscapeBoardHexSpaceLocator'
import { landscapeBoardLocator } from './LandscapeBoardLocator'
import { longshipTilesPileLocator } from './longshipTilesPileLocator'
import { oceanBoardHexSpaceLocator } from './OceanBoardHexSpaceLocator'
import { oceanBoardLocator } from './OceanBoardLocator'
import { playerikingPileLocator } from './PlayerVikingPileLocator'
import { resourceTilesPileLocator } from './ResourceTilesPileLocator'
import { trophyBoardHexSpaceLocator } from './TrophyBoardHexSpaceLocator'
import { trophyBoardLocator } from './TrophyBoardLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.LandscapeBoard]: landscapeBoardLocator,
  [LocationType.LandscapeBoardHexSpace]: landscapeBoardHexSpaceLocator,
  [LocationType.OceanBoard]: oceanBoardLocator,
  [LocationType.OceanBoardHexSpace]: oceanBoardHexSpaceLocator,
  [LocationType.TrophyBoard]: trophyBoardLocator,
  [LocationType.TrophyBoardHexSpace]: trophyBoardHexSpaceLocator,
  [LocationType.LongshipTilesPile]: longshipTilesPileLocator,
  [LocationType.ResourceTilesPile]: resourceTilesPileLocator,
  [LocationType.Bag]: bagLocator,
  [LocationType.FjordBoard]: fjordBoardLocator,
  [LocationType.FjordBoardHexSpace]: fjordBoardHexSpaceLocator,
  [LocationType.PlayerVikingPile]: playerikingPileLocator
}
