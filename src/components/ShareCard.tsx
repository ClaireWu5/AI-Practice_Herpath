import { QRCodeSVG } from 'qrcode.react'
import { colors, fonts } from '../constants/colors'
import { copy } from '../constants/copy'
import { NODES } from '../constants/nodes'
import type { ChoiceRecord } from '../types/game'
import { PixelBorder } from './PixelBorder'

interface ShareCardProps {
  playerName: string
  choices: ChoiceRecord[]
  shareLine: string
  onClose: () => void
}

export function ShareCard({ playerName, choices, shareLine, onClose }: ShareCardProps) {
  const appUrl = import.meta.env.VITE_APP_URL || window.location.origin

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: 24,
      }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 400 }}>
        <PixelBorder borderColor={colors.accentPink} padding={24}>
          <div
            style={{
              fontFamily: fonts.pixel,
              fontSize: 8,
              color: colors.textMuted,
              marginBottom: 16,
            }}
          >
            ▸ 她途 · HER WAY
          </div>
          <div
            style={{
              fontFamily: fonts.narrative,
              fontSize: 22,
              color: colors.textPrimary,
              marginBottom: 12,
            }}
          >
            {playerName} 的故事
          </div>
          <div
            style={{
              height: 2,
              backgroundColor: colors.accentPink,
              marginBottom: 20,
              maxWidth: 120,
            }}
          />
          <div style={{ marginBottom: 20 }}>
            {choices.map((c) => {
              const node = NODES[c.nodeIndex]
              return (
                <div
                  key={c.nodeIndex}
                  style={{
                    fontFamily: fonts.narrative,
                    fontSize: 15,
                    color: colors.textSecondary,
                    marginBottom: 8,
                  }}
                >
                  · 在{node.age}岁，{c.title}
                </div>
              )
            })}
          </div>
          <div
            style={{
              fontFamily: fonts.narrative,
              fontSize: 16,
              color: colors.accentGold,
              marginBottom: 20,
              lineHeight: 1.6,
            }}
          >
            {shareLine || copy.endingPivot}
          </div>
          <div
            style={{
              fontFamily: fonts.narrative,
              fontSize: 16,
              color: colors.textPrimary,
              marginBottom: 24,
              lineHeight: 1.8,
            }}
          >
            {copy.shareSloganLine1}
            <br />
            {copy.shareSloganLine2}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <QRCodeSVG value={appUrl} size={120} bgColor={colors.bgCard} fgColor={colors.textPrimary} />
            <div
              style={{
                fontFamily: fonts.narrative,
                fontSize: 14,
                color: colors.textSecondary,
                lineHeight: 1.6,
              }}
            >
              {copy.shareQrHint}
            </div>
          </div>
          <p
            style={{
              fontFamily: fonts.narrative,
              fontSize: 13,
              color: colors.textMuted,
              marginTop: 20,
              textAlign: 'center',
            }}
          >
            {copy.screenshotHint}
          </p>
        </PixelBorder>
        <button
          type="button"
          onClick={onClose}
          style={{
            display: 'block',
            margin: '16px auto 0',
            fontFamily: fonts.pixel,
            fontSize: 8,
            color: colors.textMuted,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          关闭
        </button>
      </div>
    </div>
  )
}
