import { colors, fonts } from '../constants/colors'
import { copy } from '../constants/copy'
import { PixelDots } from '../components/Scanlines'
import { PixelButton, PageShell } from '../components/PixelButton'
import { IS_DEMO_MODE } from '../services/anthropic'

interface CoverProps {
  onStart: () => void
}

export function Cover({ onStart }: CoverProps) {
  return (
    <PageShell maxWidth={560}>
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: fonts.narrative,
            fontSize: 72,
            fontWeight: 400,
            color: colors.textPrimary,
            margin: '0 0 16px',
            letterSpacing: 8,
          }}
        >
          她途
        </h1>
        <p
          style={{
            fontFamily: fonts.pixel,
            fontSize: 10,
            color: colors.textSecondary,
            marginBottom: 32,
            lineHeight: 2,
          }}
        >
          HER WAY · HER WORLD
        </p>
        <PixelDots />
        <p
          style={{
            fontFamily: fonts.narrative,
            fontSize: 18,
            color: colors.textSecondary,
            lineHeight: 1.8,
            margin: '32px 0 48px',
          }}
        >
          {copy.coverTagline}
        </p>
        <PixelButton label="▸ 开始她的故事" onClick={onStart} blink />
        {IS_DEMO_MODE && (
          <p
            style={{
              fontFamily: fonts.pixel,
              fontSize: 7,
              color: colors.accentGold,
              marginTop: 32,
              lineHeight: 2.2,
              opacity: 0.85,
            }}
          >
            DEMO 演示版 · 内置预置文案
            <br />
            <span style={{ color: colors.textMuted }}>
              配置 API KEY 后将由 AI 实时生成
            </span>
          </p>
        )}
        <p
          style={{
            fontFamily: fonts.pixel,
            fontSize: 6,
            color: colors.textMuted,
            marginTop: 64,
            lineHeight: 2,
          }}
        >
          {copy.coverCopyright}
        </p>
      </div>
    </PageShell>
  )
}
