/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { DropAreaDescription, HexagonalGridLocator } from '@gamepark/react-game'
import { ItemContext, MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { HexGridSystem, Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'

class FjordBoardHexSpaceLocator extends HexagonalGridLocator {
  parentItemType = MaterialType.FjordBoard
  coordinatesSystem = HexGridSystem.EvenQ
  size = { x: 1.74, y: 1.7 }

  getRotateZ(): number {
    return 0
  }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  getPositionOnParent(_location: Location, _context: MaterialContext): XYCoordinates {
    return { x: 17.5, y: 18 }
  }

  locationDescription = new FjordBoardHexDropDescription()

  getHoverTransform = (item: MaterialItem, context: ItemContext) => {
    const typesToScale = [MaterialType.LongshipTile, MaterialType.ConstructionSiteTile]
    if (typesToScale.includes(context.type)) {
      const translateZ = item.location.rotation ? 'translateZ(-10em)' : 'translateZ(10em)'
      return [translateZ, 'scale(3.5)']
    }
    return []
  }
}

class FjordBoardHexDropDescription extends DropAreaDescription {
  width = 2.6
  height = 2.6
  borderRadius = 1.5
  extraCss = css`
    width: 3em;
    height: 2.6em;
    border-radius: 0;
    aspect-ratio: 1 / cos(30deg);
    clip-path: polygon(50% -50%, 100% 50%, 50% 150%, 0 50%);
  `
}

export const fjordBoardHexSpaceLocator = new FjordBoardHexSpaceLocator()
