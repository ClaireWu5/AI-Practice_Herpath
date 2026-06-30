import type { OptionKey } from '../constants/nodes'
import { NODES } from '../constants/nodes'
import type { ChoiceRecord } from '../types/game'

const OPPOSITE_MAP: Record<OptionKey, OptionKey> = {
  A: 'B',
  B: 'C',
  C: 'A',
}

export function getOppositeOptionKey(key: OptionKey): OptionKey {
  return OPPOSITE_MAP[key]
}

export function getParallelChoices(choices: ChoiceRecord[]) {
  return choices.map((choice) => {
    const node = NODES[choice.nodeIndex]
    const oppositeKey = getOppositeOptionKey(choice.optionKey)
    const oppositeOption = node.options.find((o) => o.key === oppositeKey)!
    return {
      nodeIndex: choice.nodeIndex,
      age: node.age,
      nodeTitle: node.title,
      original: choice,
      parallel: oppositeOption,
    }
  })
}

export function formatChoicesSummary(choices: ChoiceRecord[], parallel = false): string {
  return choices
    .map((c, i) => {
      const node = NODES[i]
      if (parallel) {
        const oppositeKey = getOppositeOptionKey(c.optionKey)
        const opt = node.options.find((o) => o.key === oppositeKey)!
        return `${node.age}岁「${node.title}」：${opt.title}`
      }
      return `${node.age}岁「${node.title}」：${c.title}`
    })
    .join('；')
}
