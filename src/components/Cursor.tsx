'use client'

import { useEffect, useRef } from 'react'

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = `${mx}px`
      cursor.style.top = `${my}px`
    }

    const animate = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = `${rx}px`
      ring.style.top = `${ry}px`
      raf = requestAnimationFrame(animate)
    }

    const onEnterInteractive = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)'
      ring.style.transform = 'translate(-50%,-50%) scale(1.5)'
    }
    const onLeaveInteractive = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)'
      ring.style.transform = 'translate(-50%,-50%) scale(1)'
    }

    document.addEventListener('mousemove', onMove)
    animate()

    const bind = () => {
      const nodes = Array.from(document.querySelectorAll('a, button')) as HTMLElement[]
      for (const n of nodes) {
        n.addEventListener('mouseenter', onEnterInteractive)
        n.addEventListener('mouseleave', onLeaveInteractive)
      }
      return () => {
        for (const n of nodes) {
          n.removeEventListener('mouseenter', onEnterInteractive)
          n.removeEventListener('mouseleave', onLeaveInteractive)
        }
      }
    }

    const unbind = bind()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      unbind()
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef}>
        <svg viewBox="0 0 28 28" className="cursor-orb" aria-hidden="true">
          <circle cx="10" cy="14" r="9" fill="var(--cyan)" opacity="0.95" />
          <circle cx="18" cy="14" r="9" fill="var(--coral)" opacity="0.9" />
          <circle cx="14" cy="14" r="5" fill="var(--navy)" opacity="0.6" />
        </svg>
      </div>
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}

