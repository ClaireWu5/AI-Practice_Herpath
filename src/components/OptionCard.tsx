import { useState } from 'react'
import { colors, fonts } from '../constants/colors'
import type { NodeOption } from '../constants/nodes'
import { NodePixelArt } from './PixelArt'
import { PixelBorder } from './PixelBorder'

interface OptionCardProps {
  option: NodeOption
  nodeIndex: number
  onSelect: () => void
  disabled?: boolean
  /** 强制展开副标题（用于已选定后的回显） */
  forceReveal?: boolean
}

export function OptionCard({
  option,
  nodeIndex,
  onSelect,
  disabled,
  forceReveal,
}: OptionCardProps) {
  const [hovered, setHovered] = useState(false)
  // 两段式：第一次点击展开副标题，第二次点击确认选择
  const [revealed, setRevealed] = useState(false)
  const isRevealed = forceReveal || revealed
  const borderColor =
    (hovered || isRevealed) && !disabled ? colors.accentPink : colors.textDisabled

  const handleClick = () => {
    if (disabled) return
    if (!isRevealed) {
      setRevealed(true)
      return
    }
    onSelect()
  }

  return (
    <PixelBorder
      borderColor={borderColor}
      padding={16}
      onClick={disabled ? undefined : handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: disabled ? 'default' : 'pointer',
        flex: 1,
        minWidth: 160,
        transition: 'box-shadow 0.15s',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <NodePixelArt nodeIndex={nodeIndex} optionKey={option.key} />
        <div
          style={{
            fontFamily: fonts.narrative,
            fontSize: 16,
            color: colors.textPrimary,
            textAlign: 'center',
          }}
        >
          {option.title}
        </div>
        {isRevealed ? (
          <>
            <div
              style={{
                fontFamily: fonts.narrative,
                fontSize: 14,
                color: colors.textSecondary,
                textAlign: 'center',
                lineHeight: 1.6,
              }}
            >
              {option.subtitle}
            </div>
            {!disabled && (
              <div
                style={{
                  fontFamily: fonts.pixel,
                  fontSize: 7,
                  color: colors.accentGold,
                  textAlign: 'center',
                  marginTop: 2,
                }}
              >
                ▸ 再次点击确认
              </div>
            )}
          </>
        ) : (
          !disabled && (
            <div
              style={{
                fontFamily: fonts.pixel,
                fontSize: 7,
                color: colors.textMuted,
                textAlign: 'center',
              }}
            >
              点击查看
            </div>
          )
        )}
      </div>
    </PixelBorder>
  )
}
