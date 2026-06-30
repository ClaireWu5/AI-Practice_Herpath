import type { ChoiceRecord } from '../types/game'
import { getAgeRelationSentence } from '../utils/ageCopy'
import { formatChoicesSummary } from '../utils/parallelChoices'
import { NODES } from '../constants/nodes'
import type { NodeOption, OptionKey } from '../constants/nodes'
import {
  DEMO_SCENERY,
  DEMO_SCENERY_DEFAULT,
  DEMO_PARALLEL_INTRO,
  DEMO_SHARE_LINES,
  buildDemoLetter,
  nextDemoParallelReply,
  pickRandom,
  demoSceneryKey,
} from '../constants/demoContent'

const MODEL = 'claude-sonnet-4-6'
const MAX_TOKENS = 1000

/** 是否处于演示模式（未配置 API key） */
export const IS_DEMO_MODE = !import.meta.env.VITE_ANTHROPIC_API_KEY

/** 模拟"生成"过程的延迟，让演示模式的加载动画自然过渡 */
function demoDelay(ms = 700): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function callClaude(system: string, user: string): Promise<string> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('未配置 VITE_ANTHROPIC_API_KEY')
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`API 请求失败: ${response.status} ${err}`)
  }

  const data = (await response.json()) as {
    content: Array<{ type: string; text?: string }>
  }
  const text = data.content.find((c) => c.type === 'text')?.text?.trim()
  if (!text) throw new Error('API 返回为空')
  return text
}

export function sceneryPrompt(
  name: string,
  age: number,
  nodeTitle: string,
  option: NodeOption
): string {
  return `玩家叫"${name}"，在${age}岁，面对"${nodeTitle}"，她选择了：「${option.title}」（${option.subtitle}）。
请用80字左右，描述她在这个选择之后看到的"风景"——不是结果，而是感受和画面。
不要有评判，不要说这个选择好或不好。要有诗意，但真实。
直接输出内容，不要任何前缀。`
}

export function parallelSystemPrompt(name: string, choices: ChoiceRecord[]): string {
  const original = formatChoicesSummary(choices, false)
  const parallel = formatChoicesSummary(choices, true)
  return `你是"${name}"在平行宇宙里的另一个版本。
原本的她的选择：${original}
你（平行的她）的选择：${parallel}

用第一人称和她对话。语气真实、平静，有时会有遗憾，有时会庆幸，但不后悔自己的路。
每次回复不超过80字。不要说教，不要比较谁更好。`
}

export function parallelIntroPrompt(name: string, choices: ChoiceRecord[]): string {
  const original = formatChoicesSummary(choices, false)
  const parallel = formatChoicesSummary(choices, true)
  return `玩家叫"${name}"。
原本的她的选择：${original}
平行宇宙里她的选择：${parallel}

请用第一人称写一段约60字的自我介绍，作为平行宇宙里的"她"向玩家打招呼。
语气真实、平静，有时会有遗憾，有时庆幸，但不后悔自己的路。不要说教，不要比较谁更好。
直接输出内容，不要任何前缀。`
}

export function letterPrompt(name: string, birthYear: number, choices: ChoiceRecord[]): string {
  const ageSentence = getAgeRelationSentence(birthYear)
  const choiceList = choices
    .map((c, i) => {
      const node = NODES[i]
      return `${node.age}岁时选择了「${c.title}」`
    })
    .join('；')

  return `请为玩家"${name}"写一封约100字的个性化信件。
${ageSentence}
她的选择：${choiceList}
要求：
- 开头必须是"${name}，"
- 逐一提及她的5个选择，但不评判好坏
- 必须包含这句话：此刻，就是你能改变的起点。
- 最后一行必须是：人生没有存档，但每一步都算数。
直接输出信件全文，不要任何前缀。`
}

export function shareLinePrompt(letter: string): string {
  return `以下是一封信件的内容：
${letter}

请从中提炼一句不超过30字的精华，温暖、有力量，适合放在分享卡上。
直接输出这一句话，不要任何前缀。`
}

export const FALLBACK_SCENERY =
  '风从窗外吹进来，笔迹在纸上慢慢干透。她望向前方，不知道那是什么，但此刻的心跳是真实的。'

export async function generateScenery(
  name: string,
  nodeIndex: number,
  option: NodeOption
): Promise<string> {
  if (IS_DEMO_MODE) {
    await demoDelay()
    const text =
      DEMO_SCENERY[demoSceneryKey(nodeIndex, option.key as OptionKey)] ??
      DEMO_SCENERY_DEFAULT
    return text.replace(/她/g, name)
  }
  const node = NODES[nodeIndex]
  return callClaude(
    '你是一位温柔的中文叙事作家，擅长用诗意但真实的语言描写人生瞬间。',
    sceneryPrompt(name, node.age, node.title, option)
  )
}

export async function generateParallelIntro(
  name: string,
  choices: ChoiceRecord[]
): Promise<string> {
  if (IS_DEMO_MODE) {
    await demoDelay()
    return pickRandom(DEMO_PARALLEL_INTRO)
  }
  return callClaude(
    '你是一位温柔的中文叙事作家。',
    parallelIntroPrompt(name, choices)
  )
}

export async function generateParallelReply(
  name: string,
  choices: ChoiceRecord[],
  history: Array<{ role: 'user' | 'assistant'; content: string }>,
  userMessage: string
): Promise<string> {
  if (IS_DEMO_MODE) {
    await demoDelay(600)
    return nextDemoParallelReply(userMessage)
  }
  const system = parallelSystemPrompt(name, choices)
  const prior = history.slice(0, -1)
  const conversation = [
    ...prior.map((m) => `${m.role === 'user' ? '玩家' : '平行的她'}: ${m.content}`),
    `玩家: ${userMessage}`,
    '平行的她:',
  ].join('\n')
  return callClaude(system, conversation)
}

export async function generateLetter(
  name: string,
  birthYear: number,
  choices: ChoiceRecord[]
): Promise<string> {
  if (IS_DEMO_MODE) {
    await demoDelay(900)
    const ageSentence = getAgeRelationSentence(birthYear)
    const choiceList = choices
      .map((c, i) => `${NODES[i].age}岁时，你选择了「${c.title}」`)
      .join('；')
    return buildDemoLetter(name, ageSentence, choiceList)
  }
  return callClaude(
    '你是一位温柔的中文信件写作者，文字真诚、不评判、不说教。',
    letterPrompt(name, birthYear, choices)
  )
}

export async function generateShareLine(letter: string): Promise<string> {
  if (IS_DEMO_MODE) {
    await demoDelay(400)
    return pickRandom(DEMO_SHARE_LINES)
  }
  return callClaude(
    '你是一位文案编辑，擅长提炼金句。',
    shareLinePrompt(letter)
  )
}
