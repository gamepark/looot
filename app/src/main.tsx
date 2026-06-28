import { LoootBot } from '@gamepark/looot/bot/LoootBot.ts'
import { LoootOptionsSpec } from '@gamepark/looot/LoootOptions.ts'
import { LoootRules } from '@gamepark/looot/LoootRules.ts'
import { LoootSetup } from '@gamepark/looot/LoootSetup.ts'
import { GameProvider } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { RulesHelp } from './dialogs/RulesHelp.ts'
import { LoootLogs } from './history/LoootLogs.ts'
import Background from './images/Background.jpg'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { LoootScoringDescription } from './scoring/LoootScoringDescription.tsx'
import { Tutorial } from './tutorial/Tutorial.tsx'

createRoot(document.getElementById('root')!).render(
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
      tutorial={new Tutorial()}
      ai={(game: MaterialGame, playerId: number) => Promise.resolve(new LoootBot(playerId).run(game))}
      theme={{ root: { background: { image: Background } } }}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
