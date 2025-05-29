/** @jsxImportSource @emotion/react */
import { Building } from '@gamepark/looot/material/Building'
import { CardDescription } from '@gamepark/react-game'
import House from '../images/batiments/maison.png'
import WatchTower from '../images/batiments/tour.png'
import Castle from '../images/batiments/chateau.png'

export class BuildingTileDescription extends CardDescription {
  height = 2.7
  width = 3

  images = images
}

const images = {
  [Building.House]: House,
  [Building.Watchtower]: WatchTower,
  [Building.Castle]: Castle
}

export const buildingTileDescription = new BuildingTileDescription()
