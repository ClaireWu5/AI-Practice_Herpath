import { useEffect, useMemo, useRef, useState } from 'react'
import { colors, fonts } from '../constants/colors'
import { copy } from '../constants/copy'
import { PageShell, PixelButton } from '../components/PixelButton'
import { PixelBorder } from '../components/PixelBorder'
import { generateParallelIntro } from '../services/anthropic'
import { getParallelChoices } from '../utils/parallelChoices'
import { DEMO_SCENERY, demoSceneryKey } from '../constants/demoContent'
import type { ChoiceRecord, ParallelMessage } from '../types/game'

interface ParallelProps {
  playerName: string
  choices: ChoiceRecord[]
  cachedIntro?: string
  onIntroGenerated: (intro: string) => void
  onMessage: (msg: ParallelMessage) => void
  onFinish: () => void
}

interface DanmuItem {
  text: string
  top: number
  duration: number
  delay: number
}

export function Parallel({
  playerName,
  choices,
  cachedIntro,
  onIntroGenerated,
  onMessage,
  onFinish,
}: ParallelProps) {
  const [intro, setIntro] = useState(cachedIntro ?? '')
  const [loading, setLoading] = useState(!cachedIntro)
  const [note, setNote] = useState('')
  const [noteSent, setNoteSent] = useState(false)
  const introStarted = useRef(false)

  // 由玩家的选择推导出"平行的她"在每个节点做的相反选择，作为弹幕内容
  const danmus = useMemo<DanmuItem[]>(() => {
    const parallels = getParallelChoices(choices)
    const items = parallels.map((p) => {
      const key = demoSceneryKey(p.nodeIndex, p.parallel.key)
      const scenery = DEMO_SCENERY[key]
      // 取风景文案首句，营造"平行的她正在经历"的弹幕感
      const sentence = scenery ? scenery.split(/[。！]/)[0] : p.parallel.subtitle
      return `${p.age}岁 · 那个我选择了「${p.parallel.title}」——${sentence}`
    })
    // 复制一份让弹幕更密集
    const doubled = [...items, ...items.map((t) => t)]
    return doubled.map((text, i) => ({
      text,
      top: 8 + ((i * 37) % 70),
      duration: 12 + (i % 4) * 2,
      delay: (i % parallels.length) * 1.6 + (i >= parallels.length ? 0.8 : 0),
    }))
  }, [choices])

  useEffect(() => {
    if (cachedIntro) {
      setIntro(cachedIntro)
      setLoading(false)
      return
    }
    if (introStarted.current) return
    introStarted.current = true

    let cancelled = false
    generateParallelIntro(playerName, choices)
      .then((text) => {
        if (!cancelled) {
          setIntro(text)
          onIntroGenerated(text)
        }
      })
      .catch(() => {
        if (!cancelled) {
          const fallback = `你好，我是另一个宇宙里的${playerName}。那里的我走了不同的路，但我不后悔。`
          setIntro(fallback)
          onIntroGenerated(fallback)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [cachedIntro, playerName, choices, onIntroGenerated])

  const handleSendNote = () => {
    const text = note.trim()
    if (!text) return
    onMessage({ role: 'user', content: text })
    setNoteSent(true)
  }

  const handleFinish = () => {
    const text = note.trim()
    if (text && !noteSent) {
      onMessage({ role: 'user', content: text })
    }
    onFinish()
  }

  return (
    <PageShell maxWidth={680} purpleTheme>
      <style>{keyframes}</style>
      <h2
        style={{
          fontFamily: fonts.narrative,
          fontSize: 24,
          color: colors.accentPurple,
          marginBottom: 12,
          textAlign: 'center',
        }}
      >
        平行的她们
      </h2>
      <p
        style={{
          fontFamily: fonts.narrative,
          fontSize: 15,
          color: colors.textSecondary,
          textAlign: 'center',
          marginBottom: 24,
          lineHeight: 1.7,
        }}
      >
        在无数个平行宇宙里，她在每个岔路口都拐向了另一边。看，那些她正从你眼前飘过。
      </p>

      {/* 弹幕区 */}
      <div
        style={{
          position: 'relative',
          height: 240,
          overflow: 'hidden',
          marginBottom: 20,
          backgroundColor: 'rgba(155, 89, 182, 0.06)',
          ...pixelEdge,
        }}
      >
        {danmus.map((d, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${d.top}%`,
              left: '100%',
              whiteSpace: 'nowrap',
              fontFamily: fonts.narrative,
              fontSize: 14,
              color: i % 3 === 0 ? colors.accentPurple : colors.textSecondary,
              opacity: 0.92,
              animation: `danmu ${d.duration}s linear ${d.delay}s infinite`,
              willChange: 'transform',
            }}
          >
            {d.text}
          </div>
        ))}
      </div>

      {/* 平行的她的旁白 */}
      {!loading && intro && (
        <PixelBorder borderColor={colors.accentPurple} padding={16} style={{ marginBottom: 24 }}>
          <p
            style={{
              fontFamily: fonts.narrative,
              fontSize: 15,
              color: colors.textSecondary,
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            <span style={{ color: colors.accentPurple, marginRight: 8 }}>她：</span>
            {intro}
          </p>
        </PixelBorder>
      )}
      {loading && (
        <p
          style={{
            fontFamily: fonts.narrative,
            fontSize: 15,
            color: colors.textMuted,
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          她正在走来…
        </p>
      )}

      {/* 可选留言 */}
      <p
        style={{
          fontFamily: fonts.pixel,
          fontSize: 8,
          color: colors.textMuted,
          marginBottom: 8,
        }}
      >
        写给平行宇宙的自己（选填）
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <div
          style={{
            flex: 1,
            backgroundColor: colors.bgCard,
            padding: 12,
            boxShadow: `-4px 0 0 0 ${colors.accentPurple}, 4px 0 0 0 ${colors.accentPurple}, 0 -4px 0 0 ${colors.accentPurple}, 0 4px 0 0 ${colors.accentPurple}`,
          }}
        >
          <input
            value={note}
            maxLength={60}
            onChange={(e) => {
              setNote(e.target.value)
              setNoteSent(false)
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSendNote()}
            placeholder="想对另一个自己说点什么…"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: fonts.narrative,
              fontSize: 16,
              color: colors.textPrimary,
            }}
          />
        </div>
        <PixelButton
          label={noteSent ? '已留下' : '留下'}
          onClick={handleSendNote}
          disabled={!note.trim() || noteSent}
          borderColor={colors.accentPurple}
        />
      </div>
      {noteSent && (
        <p
          style={{
            fontFamily: fonts.narrative,
            fontSize: 14,
            color: colors.accentGold,
            textAlign: 'center',
            marginBottom: 12,
          }}
        >
          你的话，会被某个平行宇宙的她听见。
        </p>
      )}

      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <PixelButton
          label="▸ 回到自己的故事"
          onClick={handleFinish}
          borderColor={colors.accentPurple}
        />
      </div>
      <p
        style={{
          fontFamily: fonts.pixel,
          fontSize: 7,
          color: colors.textMuted,
          textAlign: 'center',
          marginTop: 16,
          lineHeight: 2,
        }}
      >
        {copy.endingClosing}
      </p>
    </PageShell>
  )
}

const pixelEdge = {
  boxShadow: `-4px 0 0 0 ${colors.accentPurple}, 4px 0 0 0 ${colors.accentPurple}, 0 -4px 0 0 ${colors.accentPurple}, 0 4px 0 0 ${colors.accentPurple}`,
} as const

const keyframes = `
@keyframes danmu {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% - 720px)); }
}
`
