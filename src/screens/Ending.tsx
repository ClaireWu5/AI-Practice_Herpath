import { useEffect, useRef, useState } from 'react'
import { colors, fonts } from '../constants/colors'
import { copy } from '../constants/copy'
import { NODES } from '../constants/nodes'
import { NodePixelArt } from '../components/PixelArt'
import { LoadingText, PageShell, PixelButton } from '../components/PixelButton'
import { PixelBorder } from '../components/PixelBorder'
import { ShareCard } from '../components/ShareCard'
import { generateLetter, generateShareLine } from '../services/anthropic'
import type { ChoiceRecord } from '../types/game'

interface EndingProps {
  playerName: string
  birthYear: number
  choices: ChoiceRecord[]
  cachedLetter?: string
  cachedShareLine?: string
  showShareCard: boolean
  onLetterGenerated: (letter: string) => void
  onShareLineGenerated: (line: string) => void
  onShowShareCard: () => void
  onCloseShareCard: () => void
}

export function Ending({
  playerName,
  birthYear,
  choices,
  cachedLetter,
  cachedShareLine,
  showShareCard,
  onLetterGenerated,
  onShareLineGenerated,
  onShowShareCard,
  onCloseShareCard,
}: EndingProps) {
  const [letter, setLetter] = useState(cachedLetter ?? '')
  const [shareLine, setShareLine] = useState(cachedShareLine ?? '')
  const [loading, setLoading] = useState(!cachedLetter)
  const letterStarted = useRef(false)

  useEffect(() => {
    if (cachedLetter) {
      setLetter(cachedLetter)
      if (cachedShareLine) setShareLine(cachedShareLine)
      setLoading(false)
      return
    }
    if (letterStarted.current) return
    letterStarted.current = true

    let cancelled = false
    generateLetter(playerName, birthYear, choices)
      .then(async (text) => {
        if (cancelled) return
        setLetter(text)
        onLetterGenerated(text)
        try {
          const line = await generateShareLine(text)
          if (!cancelled) {
            setShareLine(line)
            onShareLineGenerated(line)
          }
        } catch {
          if (!cancelled) {
            const fallback = copy.endingPivot
            setShareLine(fallback)
            onShareLineGenerated(fallback)
          }
        }
      })
      .catch(() => {
        if (cancelled) return
        const fallback = `${playerName}，\n\n你走过的每一条路，都留下了真实的痕迹。${copy.endingPivot}\n\n${copy.endingClosing}`
        setLetter(fallback)
        onLetterGenerated(fallback)
        setShareLine(copy.endingPivot)
        onShareLineGenerated(copy.endingPivot)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [
    cachedLetter,
    cachedShareLine,
    playerName,
    birthYear,
    choices,
    onLetterGenerated,
    onShareLineGenerated,
  ])

  return (
    <PageShell maxWidth={640}>
      <h2
        style={{
          fontFamily: fonts.narrative,
          fontSize: 28,
          marginBottom: 32,
          textAlign: 'center',
        }}
      >
        给你的信
      </h2>

      {loading ? (
        <LoadingText text="信件正在写就…" />
      ) : (
        <PixelBorder borderColor={colors.accentPink} padding={24} style={{ marginBottom: 32 }}>
          <p
            style={{
              fontFamily: fonts.narrative,
              fontSize: 18,
              color: colors.textPrimary,
              lineHeight: 2,
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}
          >
            {letter}
          </p>
        </PixelBorder>
      )}

      <h3
        style={{
          fontFamily: fonts.narrative,
          fontSize: 20,
          color: colors.textSecondary,
          marginBottom: 20,
        }}
      >
        你的选择
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
        {choices.map((c) => {
          const node = NODES[c.nodeIndex]
          return (
            <div
              key={c.nodeIndex}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                backgroundColor: colors.bgCard,
                padding: 12,
                boxShadow: `-4px 0 0 0 ${colors.textDisabled}, 4px 0 0 0 ${colors.textDisabled}, 0 -4px 0 0 ${colors.textDisabled}, 0 4px 0 0 ${colors.textDisabled}`,
              }}
            >
              <NodePixelArt nodeIndex={c.nodeIndex} optionKey={c.optionKey} size={48} />
              <div>
                <div
                  style={{
                    fontFamily: fonts.pixel,
                    fontSize: 8,
                    color: colors.accentGold,
                    marginBottom: 4,
                  }}
                >
                  {node.age}岁 · {node.title}
                </div>
                <div
                  style={{
                    fontFamily: fonts.narrative,
                    fontSize: 16,
                    color: colors.textPrimary,
                  }}
                >
                  {c.title}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ textAlign: 'center' }}>
        <PixelButton
          label="▸ 生成分享长图"
          onClick={onShowShareCard}
          disabled={loading}
          borderColor={colors.accentPink}
        />
      </div>

      {showShareCard && (
        <ShareCard
          playerName={playerName}
          choices={choices}
          shareLine={shareLine}
          onClose={onCloseShareCard}
        />
      )}
    </PageShell>
  )
}
