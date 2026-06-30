import type { CSSProperties, ReactNode } from 'react'
import { colors } from '../constants/colors'

type BorderColor = string

export function pixelBorderStyle(color: BorderColor): CSSProperties {
  return {
    boxShadow: `
      -4px 0 0 0 ${color},
      4px 0 0 0 ${color},
      0 -4px 0 0 ${color},
      0 4px 0 0 ${color}
    `,
  }
}

interface PixelBorderProps {
  children: ReactNode
  borderColor?: BorderColor
  backgroundColor?: string
  padding?: string | number
  style?: CSSProperties
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function PixelBorder({
  children,
  borderColor = colors.textDisabled,
  backgroundColor = colors.bgCard,
  padding = 16,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: PixelBorderProps) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor,
        padding,
        ...pixelBorderStyle(borderColor),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
