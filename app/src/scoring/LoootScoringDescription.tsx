/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LoootRules } from '@gamepark/looot/LoootRules'
import { PlayerColor } from '@gamepark/looot/PlayerColor'
import { ScoreHelper } from '@gamepark/looot/rules/helpers/ScoreHelper'
import { Picture, ScoringDescription, ScoringValue } from '@gamepark/react-game'
import { getEnumValues } from '@gamepark/rules-api'
import Castle from '../images/scoring/castle.png'
import Tower from '../images/scoring/tower.png'
import House from '../images/scoring/house.png'
import Gold from '../images/scoring/gold.png'
import Sheep from '../images/scoring/sheep.png'
import Wood from '../images/scoring/wood.png'
import Constructions from '../images/scoring/constructions.png'
import Trophy from '../images/scoring/trophy.png'
import Malus from '../images/scoring/malus.png'

enum ScoringKey {
  Castle = 1,
  Tower,
  House,
  Gold,
  Sheep,
  Wood,
  Constructions,
  Trophy,
  Malus,
  Total
}

export class LoootScoringDescription implements ScoringDescription {
  getScoringKeys() {
    return getEnumValues(ScoringKey)
  }

  getScoringHeader(key: ScoringKey): ScoringValue {
    switch (key) {
      case ScoringKey.Castle:
        return <Picture src={Castle} css={iconCss} />
      case ScoringKey.Tower:
        return <Picture src={Tower} css={iconCss} />
      case ScoringKey.House:
        return <Picture src={House} css={iconCss} />
      case ScoringKey.Gold:
        return <Picture src={Gold} css={iconCss} />
      case ScoringKey.Sheep:
        return <Picture src={Sheep} css={iconCss} />
      case ScoringKey.Wood:
        return <Picture src={Wood} css={iconCss} />
      case ScoringKey.Constructions:
        return <Picture src={Constructions} css={iconCssSmaller} />
      case ScoringKey.Trophy:
        return <Picture src={Trophy} css={iconCss} />
      case ScoringKey.Malus:
        return <Picture src={Malus} css={iconCss} />
      case ScoringKey.Total:
        return <span css={totalCss}>=</span>
    }
  }

  getScoringPlayerData(key: ScoringKey, player: PlayerColor, rules: LoootRules) {
    const scoreHelper = new ScoreHelper(rules.game, player)
    switch (key) {
      case ScoringKey.Castle:
        return this.calculScore(scoreHelper.getNbCastle(), scoreHelper.getCastleValue())
      case ScoringKey.Tower:
        return this.calculScore(scoreHelper.getNbWatchTower(), scoreHelper.getWatchTowerValue())
      case ScoringKey.House:
        return this.calculScore(scoreHelper.getNbHouse(), scoreHelper.getHouseValue())
      case ScoringKey.Gold:
        return this.calculScore(scoreHelper.getNbGold(), scoreHelper.getGoldValue())
      case ScoringKey.Sheep:
        return this.calculScore(scoreHelper.getNbSheep(), scoreHelper.getSheepValue())
      case ScoringKey.Wood:
        return this.calculScore(scoreHelper.getNbWood(), scoreHelper.getWoodValue())
      case ScoringKey.Constructions:
        return scoreHelper.getConstructionSiteScore()
      case ScoringKey.Trophy:
        return scoreHelper.getTrophyScore()
      case ScoringKey.Malus:
        return <span css={warning}>{this.calculScore(scoreHelper.getNotReturnedLongshipMalus() / 5, -5)}</span>
      case ScoringKey.Total:
        return scoreHelper.getTotalScore()
    }
  }

  calculScore(nbTile: number, value: number) {
    return <span><i css={smallText}>{nbTile} x {value} = </i>{nbTile * value}</span>
  }
}

const iconCss = css`
  height: 1em;
  transform: scale(1.8) translateY(0.1em);
`

const iconCssSmaller = css`
  height: 0.8em;
  transform: scale(1.8) translateY(0.1em);
`

const warning = css`
  color: red;
`

const smallText = css`
  font-size: 0.7em;
`

const totalCss = css`
  font-size: 1.5em;
  font-weight: bold;
  line-height: 0.7;
`
