import { useEffect, useState } from 'react'
import { colors, fonts } from '../constants/colors'
import { copy } from '../constants/copy'
import { NODES } from '../constants/nodes'
import type { OptionKey } from '../constants/nodes'
import { OptionCard } from '../components/OptionCard'
import { AgeTag, ProgressBar } from '../components/ProgressBar'
import { LoadingText, PageShell, PixelButton } from '../components/PixelButton'
import { PixelBorder } from '../components/PixelBorder'
import { FALLBACK_SCENERY, generateScenery } from '../services/anthropic'

interface NodeScreenProps {
  nodeIndex: number
  playerName: string
  cachedScenery?: string
  onChoice: (optionKey: OptionKey, title: string, subtitle: string, scenery: string) => void
  onContinue: () => void
}

export function NodeScreen({
  nodeIndex,
  playerName,
  cachedScenery,
  onChoice,
  onContinue,
}: NodeScreenProps) {
  const node = NODES[nodeIndex]
  const [selectedKey, setSelectedKey] = useState<OptionKey | null>(null)
  const [scenery, setScenery] = useState(cachedScenery ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isLast = nodeIndex === NODES.length - 1
  const continueLabel = isLast ? '▸ 看看她的故事' : '▸ 继续前行'

  useEffect(() => {
    if (cachedScenery) {
      setScenery(cachedScenery)
    }
  }, [cachedScenery])

  const handleSelect = async (optionKey: OptionKey) => {
    if (selectedKey || loading) return
    const option = node.options.find((o) => o.key === optionKey)!
    setSelectedKey(optionKey)
    setLoading(true)
    setError('')

    try {
      let text = cachedScenery
      if (!text) {
        text = await generateScenery(playerName, nodeIndex, option)
      }
      setScenery(text)
      onChoice(optionKey, option.title, option.subtitle, text)
    } catch {
      const fallback = FALLBACK_SCENERY.replace('她', playerName)
      setScenery(fallback)
      onChoice(optionKey, option.title, option.subtitle, fallback)
      setError('生成失败，已显示备用文案')
    } finally {
      setLoading(false)
    }
  }

  const scenario = node.scenario.replace(/你/g, playerName)

  return (
    <PageShell maxWidth={800}>
      <ProgressBar currentIndex={nodeIndex} />
      <AgeTag age={node.age} title={node.title} />
      <p
        style={{
          fontFamily: fonts.narrative,
          fontSize: 18,
          color: colors.textPrimary,
          lineHeight: 1.9,
          marginBottom: 32,
        }}
      >
        {scenario}
      </p>

      {!selectedKey ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'center',
          }}
        >
          {node.options.map((opt) => (
            <OptionCard
              key={opt.key}
              option={opt}
              nodeIndex={nodeIndex}
              onSelect={() => handleSelect(opt.key)}
            />
          ))}
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <OptionCard
              option={node.options.find((o) => o.key === selectedKey)!}
              nodeIndex={nodeIndex}
              onSelect={() => {}}
              disabled
              forceReveal
            />
          </div>
          {loading ? (
            <LoadingText text={copy.loadingScenery} />
          ) : (
            <PixelBorder borderColor={colors.accentPink} padding={20} style={{ marginBottom: 24 }}>
              <p
                style={{
                  fontFamily: fonts.narrative,
                  fontSize: 18,
                  color: colors.textSecondary,
                  lineHeight: 1.9,
                  margin: 0,
                }}
              >
                {scenery}
              </p>
            </PixelBorder>
          )}
          {error && (
            <p
              style={{
                fontFamily: fonts.narrative,
                fontSize: 13,
                color: colors.textMuted,
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              {error}
            </p>
          )}
          <div style={{ textAlign: 'center' }}>
            <PixelButton
              label={continueLabel}
              onClick={onContinue}
              disabled={loading || !scenery}
            />
          </div>
        </>
      )}
    </PageShell>
  )
}
