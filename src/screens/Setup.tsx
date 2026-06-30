import { useState } from 'react'
import { colors, fonts } from '../constants/colors'
import { PixelButton, PixelInput, PageShell } from '../components/PixelButton'

interface SetupProps {
  onComplete: (name: string, birthYear: number) => void
}

export function Setup({ onComplete }: SetupProps) {
  const [name, setName] = useState('')
  const [yearStr, setYearStr] = useState('')
  const [error, setError] = useState('')
  const [welcomed, setWelcomed] = useState(false)

  const currentYear = new Date().getFullYear()
  const minYear = currentYear - 70
  const maxYear = currentYear - 10

  const validate = (): { name: string; year: number } | null => {
    const trimmed = name.trim()
    if (!trimmed) {
      setError('请输入昵称')
      return null
    }
    if (trimmed.length > 10) {
      setError('昵称最多10个字')
      return null
    }
    const year = parseInt(yearStr, 10)
    if (Number.isNaN(year) || year < minYear || year > maxYear) {
      setError(`出生年份须为 ${minYear}–${maxYear} 之间的整数（对应 10–70 岁）`)
      return null
    }
    setError('')
    return { name: trimmed, year }
  }

  const handleSubmit = () => {
    const result = validate()
    if (!result) return
    setWelcomed(true)
    setTimeout(() => onComplete(result.name, result.year), 1500)
  }

  return (
    <PageShell maxWidth={480}>
      <h2
        style={{
          fontFamily: fonts.narrative,
          fontSize: 28,
          fontWeight: 400,
          marginBottom: 32,
          textAlign: 'center',
        }}
      >
        在开始之前
      </h2>
      {!welcomed ? (
        <>
          <PixelInput
            label="昵称"
            value={name}
            onChange={setName}
            placeholder="她怎么称呼你？"
            maxLength={10}
          />
          <PixelInput
            label="出生年份"
            value={yearStr}
            onChange={setYearStr}
            type="number"
            placeholder="1998"
          />
          {error && (
            <p
              style={{
                fontFamily: fonts.narrative,
                fontSize: 14,
                color: colors.accentPink,
                marginBottom: 16,
              }}
            >
              {error}
            </p>
          )}
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <PixelButton label="▸ 开始旅程" onClick={handleSubmit} />
          </div>
        </>
      ) : (
        <p
          style={{
            fontFamily: fonts.narrative,
            fontSize: 22,
            color: colors.accentGold,
            textAlign: 'center',
            lineHeight: 1.8,
          }}
        >
          {name.trim()}，你的故事从这里开始。
        </p>
      )}
    </PageShell>
  )
}
