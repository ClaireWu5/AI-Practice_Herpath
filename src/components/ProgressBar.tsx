import { colors, fonts } from '../constants/colors'

interface ProgressBarProps {
  currentIndex: number
  total?: number
}

export function ProgressBar({ currentIndex, total = 5 }: ProgressBarProps) {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
      {Array.from({ length: total }, (_, i) => {
        let bg = colors.textDisabled
        if (i < currentIndex) bg = colors.accentPink
        if (i === currentIndex) bg = colors.accentGold
        return (
          <div
            key={i}
            style={{
              width: 32,
              height: 12,
              backgroundColor: bg,
              boxShadow: `inset 0 0 0 2px ${colors.bgMain}`,
            }}
          />
        )
      })}
    </div>
  )
}

interface AgeTagProps {
  age: number
  title: string
}

export function AgeTag({ age, title }: AgeTagProps) {
  return (
    <div
      style={{
        display: 'inline-block',
        fontFamily: fonts.pixel,
        fontSize: 10,
        color: colors.accentGold,
        marginBottom: 24,
        letterSpacing: 1,
      }}
    >
      {age}岁 · {title}
    </div>
  )
}
