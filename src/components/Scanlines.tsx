import { colors } from '../constants/colors'

export function Scanlines() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        background:
          'repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 3px)',
        opacity: 0.35,
      }}
    />
  )
}

export function PixelDots() {
  const dots = Array.from({ length: 24 }, (_, i) => i)
  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        justifyContent: 'center',
        margin: '24px 0',
      }}
    >
      {dots.map((i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: 4,
            backgroundColor: i % 3 === 0 ? colors.accentPink : colors.textDisabled,
          }}
        />
      ))}
    </div>
  )
}
