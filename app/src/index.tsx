/** @jsxImportSource @emotion/react */
import { LoootOptionsSpec } from '@gamepark/looot/LoootOptions'
import { LoootRules } from '@gamepark/looot/LoootRules'
import { LoootSetup } from '@gamepark/looot/LoootSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { RulesHelp } from './dialogs/RulesHelp'
import { LoootLogs } from './history/LoootLogs'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { LoootScoringDescription } from './scoring/LoootScoringDescription'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="looot"
      Rules={LoootRules}
      rulesHelp={RulesHelp}
      logs={new LoootLogs()}
      scoring={new LoootScoringDescription()}
      optionsSpec={LoootOptionsSpec}
      GameSetup={LoootSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
