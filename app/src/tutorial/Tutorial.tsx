/** @jsxImportSource @emotion/react */
import { Building } from '@gamepark/looot/material/Building'
import { LocationType } from '@gamepark/looot/material/LocationType'
import { MaterialType } from '@gamepark/looot/material/MaterialType'
import { Resource } from '@gamepark/looot/material/Resource'
import { Trophy } from '@gamepark/looot/material/Trophy'
import { CustomMoveType } from '@gamepark/looot/rules/CustomMove'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { me, opponent, TutorialSetup } from './TutorialSetup'

const BaseComponents = {
  bold: <strong />,
  italic: <em />
}

export class Tutorial extends MaterialTutorial<number, MaterialType, LocationType> {
  version = 1

  players = [
    { id: me },
    {
      id: opponent,
      name: 'Ragnar',
      avatar: {
        topType: 'NoHair',
        accessoriesType: 'Blank',
        facialHairType: 'BeardMajestic',
        facialHairColor: 'Blonde',
        clotheType: 'GraphicShirt',
        clotheColor: 'Black',
        graphicType: 'SkullOutline',
        eyeType: 'Surprised',
        eyebrowType: 'AngryNatural',
        mouthType: 'ScreamOpen',
        skinColor: 'Pale'
      }
    }
  ]

  options = {
    players: [{ id: me }, { id: opponent }]
  }

  setup = new TutorialSetup()

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome" components={BaseComponents} />,
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.1" components={BaseComponents} />,
        position: {
          x: 20,
          y: 0
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FjordBoard).location(LocationType.FjordBoard).player(me),
          this.material(game, MaterialType.Shield).location(LocationType.FjordBoardHexSpace).player(me),
          this.material(game, MaterialType.ConstructionSiteTile).location(LocationType.FjordBoardHexSpace).player(me),
        ],
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.2" components={BaseComponents} />,
        position: {
          x: 35,
          y: 0
        }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Viking).location(LocationType.PlayerVikingPile).player(me)],
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.3" components={BaseComponents} />
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandscapeBoard).location(LocationType.Landscape),
          this.material(game, MaterialType.OceanBoard).location(LocationType.Landscape),
          this.material(game, MaterialType.TrophyBoard).location(LocationType.Landscape),
          this.material(game, MaterialType.BuildingTile).location(LocationType.Landscape),
          this.material(game, MaterialType.LongshipTile).location(LocationType.Landscape),
          this.material(game, MaterialType.TrophyTile).location(LocationType.Landscape),

        ]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.4" components={BaseComponents} />,
        position: {
          x: 40,
          y: 10
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LongshipTile).location(LocationType.Landscape)
        ],
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.5" components={BaseComponents} />,
      },
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Viking)(move) &&
          move.location.x === -3 && move.location.y === 0
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.6" components={BaseComponents} />,
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ResourceTile).location(LocationType.ResourceTilesDeck).id(Resource.Axe)
        ],
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.7" components={BaseComponents} />,
      },
      focus: () => ({
        locations: [
          {
            type: LocationType.FjordBoardHexSpace,
            x: 2,
            y: 2,
            player: me
          }
        ],
        scale: 0.1
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.ResourceTile)(move) &&
          move.location.x === 2 && move.location.y === 2
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.8" components={BaseComponents} />,
        position: {
          x: 10,
          y: 10
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ConstructionSiteTile).location(LocationType.FjordBoardHexSpace).player(me)
        ],
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.9" components={BaseComponents} />,
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.10" components={BaseComponents} />,
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.11" components={BaseComponents} />,
        position: {
          x: 0,
          y: 10
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.BuildingTile).id(Building.House).location((l) => l.type === LocationType.Landscape && l.x === -2 && l.y === 0)
        ],
        locations: [
          {
            type: LocationType.FjordBoardHexSpace,
            x: 5,
            y: 5,
            player: me
          }
        ],
        scale: 0.7
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.BuildingTile)(move) &&
          move.location.x === 5 && move.location.y === 5
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.12" components={BaseComponents} />,
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.13" components={BaseComponents} />,
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.14" components={BaseComponents} />,
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LongshipTile).location((l) => l.type === LocationType.Landscape && l.x === -3 && l.y === -2)
        ],
        locations: [
          {
            type: LocationType.FjordBoardHexSpace,
            x: 3,
            y: 3,
            player: me
          }
        ],
        scale: 0.7
      }),
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.LongshipTile)(move) &&
          this.material(game, MaterialType.LongshipTile).location((l) => l.type === LocationType.Landscape && l.x === -3 && l.y === -2).getIndex() === move.itemIndex &&
          move.location.x === 3 && move.location.y === 3
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.15" components={BaseComponents} />,
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.16" components={BaseComponents} />,
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.17" components={BaseComponents} />,
      },
      move: {
        auto: true,
        filter: (move: MaterialMove) => isCustomMoveType(CustomMoveType.Pass)(move)
      }
    },
    {
      move: {
        player: opponent,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Viking)(move) &&
          move.location.x === -2 && move.location.y === -1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.18" components={BaseComponents} />,
      }
    },
    {
      move: { player: opponent }
    },
    {
      move: { player: opponent }
    },
    {
      move: { player: opponent, filter: (move: MaterialMove) => isCustomMoveType(CustomMoveType.Pass)(move) }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.19" components={BaseComponents} />,
      },
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Viking)(move) &&
          move.location.x === -1 && move.location.y === 0
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.20" components={BaseComponents} />,
      },
      focus: () => ({
        locations: [
          {
            type: LocationType.FjordBoardHexSpace,
            x: 4,
            y: 3,
            player: me
          }
        ],
        scale: 0.1
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.ResourceTile)(move) &&
          move.location.x === 4 && move.location.y === 3
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.21" components={BaseComponents} />,
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.22" components={BaseComponents} />,
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.23" components={BaseComponents} />,
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LongshipTile).location((l) => l.type === LocationType.Landscape && l.x === -3 && l.y === -1)
        ],
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.24" components={BaseComponents} />,
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LongshipTile).location((l) => l.type === LocationType.Landscape && l.x === -3 && l.y === -1)
        ],
        locations: [
          {
            type: LocationType.FjordBoardHexSpace,
            x: 4,
            y: 2,
            player: me
          }
        ],
        scale: 0.7
      }),
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.LongshipTile)(move) &&
          this.material(game, MaterialType.LongshipTile).location((l) => l.type === LocationType.Landscape && l.x === -3 && l.y === -1).getIndex() === move.itemIndex &&
          move.location.x === 4 && move.location.y === 2
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.25" components={BaseComponents} />,
      },
      move: {
        auto: true,
        filter: (move: MaterialMove) => isCustomMoveType(CustomMoveType.Pass)(move)
      }
    },
    {
      move: {
        player: opponent,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Viking)(move) &&
          move.location.x === 0 && move.location.y === 0
      }
    },
    {
      move: { player: opponent }
    },
    {
      move: { player: opponent }
    },
    {
      move: { player: opponent, filter: (move: MaterialMove) => isCustomMoveType(CustomMoveType.Pass)(move) }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.26" components={BaseComponents} />,
      },
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Viking)(move) &&
          move.location.x === -1 && move.location.y === -1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.27" components={BaseComponents} />,
        position: {
          x: 0,
          y: 10
        }
      },
      focus: () => ({
        locations: [
          {
            type: LocationType.FjordBoardHexSpace,
            x: 0,
            y: 1,
            player: me
          },
        ],
        scale: 0.1
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.BuildingTile)(move) &&
          move.location.x === 0 && move.location.y === 1
      }
    },
    {
      focus: () => ({
        locations: [
          {
            type: LocationType.FjordBoardHexSpace,
            x: 0,
            y: 2,
            player: me
          },
        ],
        scale: 0.1
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.BuildingTile)(move) &&
          move.location.x === 0 && move.location.y === 2
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.28" components={BaseComponents} />,
      },
      focus: () => ({
        locations: [
          {
            type: LocationType.FjordBoardHexSpace,
            x: 2,
            y: 3,
            player: me
          },
        ],
        scale: 0.1
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.ResourceTile)(move) &&
          move.location.x === 2 && move.location.y === 3
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.29" components={BaseComponents} />,
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LongshipTile).location((l) => l.type === LocationType.FjordBoardHexSpace && l.x === 3 && l.y === 3).player(me)
        ],
        scale: 0.1
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.30" components={BaseComponents} />,
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.TrophyTile).location(LocationType.Landscape)
        ],
        scale: 0.1
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.31" components={BaseComponents} />,
        position: {
          x: 0,
          y: -5
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.TrophyTile).location(LocationType.Landscape).id(Trophy.Trophy2)
        ],
        scale: 0.1
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.32" components={BaseComponents} />,
      },
      focus: () => ({
        locations: [
          {
            type: LocationType.FjordBoardHexSpace,
            x: 4,
            y: 6,
            player: me
          },
          {
            type: LocationType.FjordBoardHexSpace,
            x: 5,
            y: 6,
            player: me
          },
          {
            type: LocationType.FjordBoardHexSpace,
            x: 6,
            y: 5,
            player: me
          },
        ],
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.33" components={BaseComponents} />,
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Shield).location(LocationType.FjordBoardHexSpace).player(me)
        ],
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.34" components={BaseComponents} />,
      }
    },
  ]
}
