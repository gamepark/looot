import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { bagDescription } from './BagDescription'
import { buildingTileDescription } from './BuildingTileDescription'
import { constructionSiteTileDescription } from './ConstructionSiteTileDescription'
import { fjordBoardDescription } from './FjordBoardDescription'
import { landscapeBoardDescription } from './LandscapeBoardDescription'
import { longshipDescription } from './LongshipDescription'
import { oceanBoardDescription } from './OceanBoardDescription'
import { resourceTileDescription } from './ResourceTileDescription'
import { scorePadDescription } from './ScorePadDescription'
import { shieldDescription } from './ShieldDescription'
import { trophyBoardDescription } from './TrophyBoardDescription'
import { trophyDescription } from './TrophyDescription'
import { vikingDescription } from './VikingDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.LandscapeBoard]: landscapeBoardDescription,
  [MaterialType.OceanBoard]: oceanBoardDescription,
  [MaterialType.TrophyBoard]: trophyBoardDescription,
  [MaterialType.BuildingTile]: buildingTileDescription,
  [MaterialType.Trophy]: trophyDescription,
  [MaterialType.Longship]: longshipDescription,
  [MaterialType.ResourceTile]: resourceTileDescription,
  [MaterialType.Bag]: bagDescription,
  [MaterialType.FjordBoard]: fjordBoardDescription,
  [MaterialType.Shield]: shieldDescription,
  [MaterialType.Viking]: vikingDescription,
  [MaterialType.ConstructionSiteTile]: constructionSiteTileDescription,
  [MaterialType.ScorePad]: scorePadDescription
}
