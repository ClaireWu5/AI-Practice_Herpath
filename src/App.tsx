import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Scanlines } from './components/Scanlines'
import { ScreenTransition } from './components/ScreenTransition'
import { Cover } from './screens/Cover'
import { Ending } from './screens/Ending'
import { NodeScreen } from './screens/Node'
import { Parallel } from './screens/Parallel'
import { Setup } from './screens/Setup'
import type { ChoiceRecord, GameState, ParallelMessage } from './types/game'
import { initialGameState } from './types/game'
import type { OptionKey } from './constants/nodes'

export default function App() {
  const [state, setState] = useState<GameState>(initialGameState)

  const goTo = useCallback((screen: GameState['screen']) => {
    setState((s) => ({ ...s, screen }))
  }, [])

  const handleSetupComplete = useCallback((name: string, birthYear: number) => {
    setState((s) => ({
      ...s,
      playerName: name,
      birthYear,
      screen: 'node',
      nodeIndex: 0,
    }))
  }, [])

  const handleChoice = useCallback(
    (optionKey: OptionKey, title: string, subtitle: string, scenery: string) => {
      setState((s) => {
        const choice: ChoiceRecord = {
          nodeIndex: s.nodeIndex,
          optionKey,
          title,
          subtitle,
        }
        const existing = s.choices.filter((c) => c.nodeIndex !== s.nodeIndex)
        return {
          ...s,
          choices: [...existing, choice],
          aiCache: {
            ...s.aiCache,
            scenery: { ...s.aiCache.scenery, [s.nodeIndex]: scenery },
          },
        }
      })
    },
    []
  )

  const handleNodeContinue = useCallback(() => {
    setState((s) => {
      if (s.nodeIndex >= 4) {
        return { ...s, screen: 'parallel' }
      }
      return { ...s, nodeIndex: s.nodeIndex + 1 }
    })
  }, [])

  const handleParallelIntro = useCallback((intro: string) => {
    setState((s) => ({
      ...s,
      aiCache: { ...s.aiCache, parallelIntro: intro },
    }))
  }, [])

  const handleParallelMessage = useCallback((msg: ParallelMessage) => {
    setState((s) => ({
      ...s,
      parallelMessages: [...s.parallelMessages, msg],
    }))
  }, [])

  const handleParallelFinish = useCallback(() => {
    setState((s) => ({ ...s, screen: 'ending' }))
  }, [])

  const handleLetterGenerated = useCallback((letter: string) => {
    setState((s) => ({
      ...s,
      aiCache: { ...s.aiCache, letter },
    }))
  }, [])

  const handleShareLineGenerated = useCallback((shareLine: string) => {
    setState((s) => ({
      ...s,
      aiCache: { ...s.aiCache, shareLine },
    }))
  }, [])

  const renderScreen = () => {
    switch (state.screen) {
      case 'cover':
        return <Cover onStart={() => goTo('setup')} />
      case 'setup':
        return <Setup onComplete={handleSetupComplete} />
      case 'node':
        return (
          <NodeScreen
            nodeIndex={state.nodeIndex}
            playerName={state.playerName}
            cachedScenery={state.aiCache.scenery[state.nodeIndex]}
            onChoice={handleChoice}
            onContinue={handleNodeContinue}
          />
        )
      case 'parallel':
        return (
          <Parallel
            playerName={state.playerName}
            choices={state.choices}
            cachedIntro={state.aiCache.parallelIntro || undefined}
            onIntroGenerated={handleParallelIntro}
            onMessage={handleParallelMessage}
            onFinish={handleParallelFinish}
          />
        )
      case 'ending':
        return state.birthYear !== null ? (
          <Ending
            playerName={state.playerName}
            birthYear={state.birthYear}
            choices={state.choices}
            cachedLetter={state.aiCache.letter || undefined}
            cachedShareLine={state.aiCache.shareLine || undefined}
            showShareCard={state.showShareCard}
            onLetterGenerated={handleLetterGenerated}
            onShareLineGenerated={handleShareLineGenerated}
            onShowShareCard={() => setState((s) => ({ ...s, showShareCard: true }))}
            onCloseShareCard={() => setState((s) => ({ ...s, showShareCard: false }))}
          />
        ) : null
      default:
        return null
    }
  }

  return (
    <>
      <Scanlines />
      <AnimatePresence mode="wait">
        <ScreenTransition key={state.screen + state.nodeIndex}>{renderScreen()}</ScreenTransition>
      </AnimatePresence>
    </>
  )
}
