import type { OptionKey } from '../constants/nodes'

export type Screen = 'cover' | 'setup' | 'node' | 'parallel' | 'ending'

export interface ChoiceRecord {
  nodeIndex: number
  optionKey: OptionKey
  title: string
  subtitle: string
}

export interface ParallelMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface AiCache {
  scenery: Record<number, string>
  parallelIntro: string
  letter: string
  shareLine: string
}

export interface GameState {
  screen: Screen
  playerName: string
  birthYear: number | null
  nodeIndex: number
  choices: ChoiceRecord[]
  aiCache: AiCache
  parallelMessages: ParallelMessage[]
  showShareCard: boolean
}

export const initialAiCache = (): AiCache => ({
  scenery: {},
  parallelIntro: '',
  letter: '',
  shareLine: '',
})

export const initialGameState = (): GameState => ({
  screen: 'cover',
  playerName: '',
  birthYear: null,
  nodeIndex: 0,
  choices: [],
  aiCache: initialAiCache(),
  parallelMessages: [],
  showShareCard: false,
})
