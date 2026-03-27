'use client'

import { useEffect, useRef } from 'react'

export interface WaveFieldConfig {
  lines?: number
  alpha?: number
  lineWidth?: number
  speed?: number
  reverse?: boolean
}

export function useWaveField(config: WaveFieldConfig = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const tRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const canvasEl: HTMLCanvasElement = canvas
    const ctx2d: CanvasRenderingContext2D = ctx

    const { lines = 45, alpha = 0.22, lineWidth = 0.7, speed = 0.008, reverse = false } = config

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvasEl.width = canvasEl.offsetWidth * dpr
      canvasEl.height = canvasEl.offsetHeight * dpr
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function getY(x: number, time: number, lineIndex: number, totalLines: number): number {
      const w = canvasEl.offsetWidth
      const h = canvasEl.offsetHeight
      const cx = w / 2
      const cy = h / 2
      const prog = lineIndex / totalLines
      const xNorm = (x - cx) / cx

      let y = cy
      y += Math.sin(xNorm * 3.5 + time * 0.4) * 40 * (1 - Math.abs(prog - 0.5) * 1.8)
      y += Math.sin(xNorm * 2.1 - time * 0.3 + prog * 2) * 25
      y += Math.cos(xNorm * 5 + time * 0.6 + prog * 1.5) * 12
      y += (prog - 0.5) * h * 0.75
      return y
    }

    function draw() {
      const w = canvasEl.offsetWidth
      const h = canvasEl.offsetHeight
      const pts = 200

      ctx2d.clearRect(0, 0, w, h)

      const c1 = reverse ? { r: 77, g: 217, b: 232 } : { r: 232, g: 82, b: 58 }
      const c2 = reverse ? { r: 232, g: 82, b: 58 } : { r: 77, g: 217, b: 232 }

      for (let i = 0; i < lines; i++) {
        const mix = i / lines
        const r = Math.round(c1.r + (c2.r - c1.r) * mix)
        const g = Math.round(c1.g + (c2.g - c1.g) * mix)
        const b = Math.round(c1.b + (c2.b - c1.b) * mix)

        ctx2d.beginPath()
        for (let j = 0; j <= pts; j++) {
          const x = (j / pts) * w
          const y = getY(x, tRef.current, i, lines)
          j === 0 ? ctx2d.moveTo(x, y) : ctx2d.lineTo(x, y)
        }
        ctx2d.strokeStyle = `rgba(${r},${g},${b},${alpha})`
        ctx2d.lineWidth = lineWidth
        ctx2d.stroke()
      }

      tRef.current += speed
      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
    }
    // config is intentionally stable for this site’s usage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return canvasRef
}

