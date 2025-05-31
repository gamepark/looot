/** @jsxImportSource @emotion/react */
import { Building } from '@gamepark/looot/material/Building'
import House from '../images/batiments/maison.png'
import WatchTower from '../images/batiments/tour.png'
import Castle from '../images/batiments/chateau.png'
import { HexagoneDescription } from './HexagoneDescription'

export class BuildingTileDescription extends HexagoneDescription {
  height = 2.9
  width = 3.2

  images = images
}

const images = {
  [Building.House]: House,
  [Building.Watchtower]: WatchTower,
  [Building.Castle]: Castle
}

export const buildingTileDescription = new BuildingTileDescription()
