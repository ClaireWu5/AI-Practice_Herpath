import type { CSSProperties } from 'react'

type Pixel = [number, number, string]

function drawPixels(pixels: Pixel[]) {
  return pixels.map(([x, y, fill], i) => (
    <rect key={i} x={x} y={y} width={1} height={1} fill={fill} />
  ))
}

function PixelSvg({ pixels, style }: { pixels: Pixel[]; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={64}
      height={64}
      style={{ imageRendering: 'pixelated', ...style }}
    >
      <rect width={64} height={64} fill="#0A0A14" />
      {drawPixels(pixels)}
    </svg>
  )
}

// Node 0 - 17岁志愿
const n0a: Pixel[] = [
  ...rect(20, 8, 24, 4, '#F5C842'),
  ...rect(18, 12, 28, 20, '#1A1A2E'),
  ...rect(28, 16, 8, 8, '#E8829A'),
  ...rect(22, 32, 20, 4, '#F0E6D3'),
  ...rect(16, 36, 32, 8, '#4A3F6B'),
  ...rect(24, 44, 16, 12, '#8B7EA0'),
]
const n0b: Pixel[] = [
  ...rect(10, 20, 44, 4, '#C4B8D8'),
  ...rect(30, 12, 4, 28, '#F5C842'),
  ...rect(26, 40, 12, 8, '#E8829A'),
  ...rect(22, 48, 20, 4, '#F0E6D3'),
  ...rect(8, 52, 48, 4, '#4A3F6B'),
]
const n0c: Pixel[] = [
  ...rect(12, 16, 40, 24, '#1A1A2E'),
  ...rect(16, 20, 32, 16, '#0D0D1A'),
  ...rect(20, 24, 8, 2, '#E8829A'),
  ...rect(32, 28, 12, 2, '#8B7EA0'),
  ...rect(24, 36, 16, 4, '#F5C842'),
  ...rect(28, 44, 8, 12, '#C4B8D8'),
]

// Node 1 - 22岁毕业
const n1a: Pixel[] = [
  ...rect(8, 40, 48, 8, '#4A3F6B'),
  ...rect(12, 32, 8, 16, '#E8829A'),
  ...rect(44, 32, 8, 16, '#E8829A'),
  ...rect(20, 28, 24, 4, '#F5C842'),
  ...rect(28, 12, 8, 16, '#C4B8D8'),
  ...rect(4, 20, 56, 4, '#8B7EA0'),
]
const n1b: Pixel[] = [
  ...rect(24, 8, 16, 20, '#F0E6D3'),
  ...rect(20, 28, 24, 12, '#8B7EA0'),
  ...rect(16, 40, 32, 8, '#4A3F6B'),
  ...rect(8, 48, 48, 4, '#1A1A2E'),
  ...rect(28, 16, 8, 8, '#E8829A'),
  ...rect(4, 24, 12, 8, '#F5C842'),
]
const n1c: Pixel[] = [
  ...rect(4, 20, 56, 28, '#1A1A2E'),
  ...rect(8, 24, 48, 20, '#0D0D1A'),
  ...rect(12, 28, 8, 8, '#F5C842'),
  ...rect(44, 28, 8, 8, '#F5C842'),
  ...rect(24, 32, 16, 8, '#C4B8D8'),
  ...rect(20, 44, 24, 4, '#E8829A'),
]

// Node 2 - 25岁催婚
const n2a: Pixel[] = [
  ...rect(8, 36, 48, 12, '#4A3F6B'),
  ...rect(12, 28, 40, 8, '#1A1A2E'),
  ...rect(20, 20, 24, 8, '#F0E6D3'),
  ...rect(28, 12, 8, 8, '#E8829A'),
  ...rect(16, 16, 8, 4, '#F5C842'),
  ...rect(40, 16, 8, 4, '#F5C842'),
  ...rect(24, 32, 16, 4, '#8B7EA0'),
]
const n2b: Pixel[] = [
  ...rect(28, 8, 8, 16, '#E8829A'),
  ...rect(24, 24, 16, 16, '#C4B8D8'),
  ...rect(20, 40, 24, 8, '#1A1A2E'),
  ...rect(16, 48, 32, 4, '#4A3F6B'),
  ...rect(8, 20, 12, 4, '#F5C842'),
  ...rect(44, 20, 12, 4, '#8B7EA0'),
]
const n2c: Pixel[] = [
  ...rect(16, 12, 32, 20, '#1A1A2E'),
  ...rect(20, 16, 12, 12, '#E8829A'),
  ...rect(36, 16, 8, 12, '#F5C842'),
  ...rect(24, 32, 16, 8, '#C4B8D8'),
  ...rect(12, 44, 40, 4, '#4A3F6B'),
  ...rect(28, 36, 8, 8, '#8B7EA0'),
]

// Node 3 - 28岁事业
const n3a: Pixel[] = [
  ...rect(8, 16, 48, 32, '#1A1A2E'),
  ...rect(12, 20, 40, 24, '#0D0D1A'),
  ...rect(16, 24, 32, 4, '#F5C842'),
  ...rect(20, 32, 24, 8, '#C4B8D8'),
  ...rect(24, 44, 16, 4, '#E8829A'),
  ...rect(28, 8, 8, 8, '#F5C842'),
]
const n3b: Pixel[] = [
  ...rect(20, 8, 24, 16, '#F0E6D3'),
  ...rect(16, 24, 32, 12, '#E8829A'),
  ...rect(12, 36, 40, 8, '#4A3F6B'),
  ...rect(8, 44, 48, 8, '#1A1A2E'),
  ...rect(28, 28, 8, 8, '#F5C842'),
  ...rect(4, 28, 8, 8, '#8B7EA0'),
]
const n3c: Pixel[] = [
  ...rect(12, 12, 40, 28, '#1A1A2E'),
  ...rect(16, 16, 32, 20, '#0D0D1A'),
  ...rect(8, 20, 4, 16, '#F5C842'),
  ...rect(52, 20, 4, 16, '#F5C842'),
  ...rect(24, 24, 16, 12, '#C4B8D8'),
  ...rect(20, 40, 24, 4, '#E8829A'),
]

// Node 4 - 32岁此刻
const n4a: Pixel[] = [
  ...rect(20, 8, 24, 8, '#F5C842'),
  ...rect(24, 16, 16, 16, '#E8829A'),
  ...rect(20, 32, 24, 12, '#C4B8D8'),
  ...rect(16, 44, 32, 8, '#1A1A2E'),
  ...rect(8, 52, 48, 4, '#4A3F6B'),
  ...rect(28, 24, 8, 4, '#F0E6D3'),
]
const n4b: Pixel[] = [
  ...rect(28, 8, 8, 12, '#C4B8D8'),
  ...rect(20, 20, 24, 8, '#8B7EA0'),
  ...rect(16, 28, 32, 4, '#F5C842'),
  ...rect(12, 32, 40, 12, '#1A1A2E'),
  ...rect(24, 44, 16, 8, '#E8829A'),
  ...rect(8, 48, 48, 4, '#4A3F6B'),
]
const n4c: Pixel[] = [
  ...rect(4, 28, 56, 8, '#4A3F6B'),
  ...rect(8, 20, 48, 8, '#1A1A2E'),
  ...rect(12, 12, 40, 8, '#0D0D1A'),
  ...rect(24, 8, 16, 4, '#F5C842'),
  ...rect(20, 36, 24, 12, '#C4B8D8'),
  ...rect(28, 16, 8, 8, '#E8829A'),
]

function rect(x: number, y: number, w: number, h: number, fill: string): Pixel[] {
  const pixels: Pixel[] = []
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      pixels.push([x + i, y + j, fill])
    }
  }
  return pixels
}

const ART_MAP: Record<string, Pixel[]> = {
  '0-A': n0a,
  '0-B': n0b,
  '0-C': n0c,
  '1-A': n1a,
  '1-B': n1b,
  '1-C': n1c,
  '2-A': n2a,
  '2-B': n2b,
  '2-C': n2c,
  '3-A': n3a,
  '3-B': n3b,
  '3-C': n3c,
  '4-A': n4a,
  '4-B': n4b,
  '4-C': n4c,
}

export function NodePixelArt({
  nodeIndex,
  optionKey,
  size = 64,
}: {
  nodeIndex: number
  optionKey: string
  size?: number
}) {
  const pixels = ART_MAP[`${nodeIndex}-${optionKey}`] ?? n0a
  return <PixelSvg pixels={pixels} style={{ width: size, height: size }} />
}
