import { useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { colors, fonts } from '../constants/colors'
import { pixelBorderStyle } from './PixelBorder'

interface PixelButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  blink?: boolean
  borderColor?: string
  style?: CSSProperties
}

export function PixelButton({
  label,
  onClick,
  disabled = false,
  blink = false,
  borderColor = colors.accentGold,
  style,
}: PixelButtonProps) {
  const [blinkOn, setBlinkOn] = useState(true)

  useEffect(() => {
    if (!blink) return
    const id = setInterval(() => setBlinkOn((v) => !v), 600)
    return () => clearInterval(id)
  }, [blink])

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        fontFamily: fonts.pixel,
        fontSize: 10,
        color: disabled
          ? colors.textMuted
          : blink
            ? blinkOn
              ? colors.accentGold
              : colors.textSecondary
            : colors.accentGold,
        backgroundColor: colors.bgCard,
        border: 'none',
        padding: '16px 24px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...pixelBorderStyle(disabled ? colors.textDisabled : borderColor),
        ...style,
      }}
    >
      {label}
    </button>
  )
}

interface PixelInputProps {
  label: string
  value: string
  onChange: (v: string) => void
  type?: 'text' | 'number'
  placeholder?: string
  maxLength?: number
}

export function PixelInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  maxLength,
}: PixelInputProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: 'block',
          fontFamily: fonts.pixel,
          fontSize: 8,
          color: colors.textMuted,
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <div
        style={{
          backgroundColor: colors.bgCard,
          padding: 12,
          ...pixelBorderStyle(colors.textDisabled),
        }}
      >
        <input
          type={type}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: fonts.narrative,
            fontSize: 18,
            color: colors.textPrimary,
          }}
        />
      </div>
    </div>
  )
}

export function PageShell({
  children,
  maxWidth = 720,
  purpleTheme = false,
}: {
  children: ReactNode
  maxWidth?: number
  purpleTheme?: boolean
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: purpleTheme ? '#120D1A' : colors.bgMain,
        color: colors.textPrimary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', maxWidth }}>{children}</div>
    </div>
  )
}

export function LoadingText({ text }: { text: string }) {
  return (
    <p
      style={{
        fontFamily: fonts.narrative,
        fontSize: 18,
        color: colors.textSecondary,
        textAlign: 'center',
      }}
    >
      {text}
    </p>
  )
}
