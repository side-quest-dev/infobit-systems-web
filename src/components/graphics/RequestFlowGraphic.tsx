'use client'
import { useEffect, useRef } from 'react'
import { prefersReducedMotion, observeVisibility } from '@/lib/canvasMotion'

const SPANS = [
  { label: 'HTTP Request', start: 0.00, end: 1.00, color: '#a0a0b2', depth: 0 },
  { label: 'Auth Service', start: 0.04, end: 0.18, color: '#5b8dee', depth: 1 },
  { label: 'Core API', start: 0.18, end: 0.82, color: '#5b8dee', depth: 1 },
  { label: 'DB Query ×3', start: 0.22, end: 0.55, color: '#2dd4bf', depth: 2 },
  { label: 'Cache Hit', start: 0.55, end: 0.60, color: '#2dd4bf', depth: 2 },
  { label: 'Kafka Publish', start: 0.60, end: 0.74, color: '#2dd4bf', depth: 2 },
  { label: 'Response Build', start: 0.74, end: 0.82, color: '#5b8dee', depth: 2 },
  { label: 'HTTP Response', start: 0.82, end: 1.00, color: '#a0a0b2', depth: 0 },
]

// Metrics shown at top
const METRICS = [
  { label: 'P50', value: '12ms', color: '#2dd4bf' },
  { label: 'P95', value: '48ms', color: '#5b8dee' },
  { label: 'P99', value: '124ms', color: '#f59e0b' },
  { label: 'RPS', value: '24k', color: '#a0a0b2' },
]

export default function RequestFlowGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1

    function resize() {
      const canvasEl = canvasRef.current
      if (!canvasEl) return
      const p = canvasEl.parentElement
      if (!p) return
      canvasEl.width = p.offsetWidth * dpr; canvasEl.height = p.offsetHeight * dpr
      canvasEl.style.width = p.offsetWidth + 'px'; canvasEl.style.height = p.offsetHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw() {
      const canvasEl = canvasRef.current
      if (!canvasEl) { rafRef.current = requestAnimationFrame(draw); return }
      const W = canvasEl.offsetWidth, H = canvasEl.offsetHeight
      if (!W || !H) { rafRef.current = requestAnimationFrame(draw); return }
      ctx.clearRect(0, 0, W, H)
      const t = performance.now() / 1000

      const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, y, w, h, r)
          return
        }
        const radius = Math.min(r, w / 2, h / 2)
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + w - radius, y)
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius)
        ctx.lineTo(x + w, y + h - radius)
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
        ctx.lineTo(x + radius, y + h)
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius)
        ctx.lineTo(x, y + radius)
        ctx.quadraticCurveTo(x, y, x + radius, y)
      }

      // dot grid
      ctx.fillStyle = 'rgba(91,141,238,0.055)'
      for (let x = 20; x < W; x += 28) for (let y = 20; y < H; y += 28) {
        ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fill()
      }

      const padX = 12, padY = 16
      const metricH = 50

      // Metrics row
      const mw = (W - padX * 2) / METRICS.length
      METRICS.forEach((m, i) => {
        const mx = padX + i * mw + mw / 2
        ctx.font = `700 18px "Cormorant Garamond", serif`
        ctx.fillStyle = m.color
        ctx.textAlign = 'center'; ctx.textBaseline = 'top'
        ctx.fillText(m.value, mx, padY)
        ctx.font = `600 9px "Syne", system-ui, sans-serif`
        ctx.fillStyle = '#404050'
        ctx.fillText(m.label, mx, padY + 22)
      })

      // Waterfall area
      const wfY = padY + metricH
      const wfH = H - wfY - padY
      const labelW = W * 0.30
      const barX = labelW + padX
      const barW = W - barX - padX

      // Animated scan line
      const scanT = (t * 0.25) % 1
      const scanX = barX + barW * scanT
      ctx.strokeStyle = 'rgba(91,141,238,0.12)'
      ctx.lineWidth = 1
      ctx.setLineDash([3, 3])
      ctx.beginPath(); ctx.moveTo(scanX, wfY); ctx.lineTo(scanX, wfY + wfH)
      ctx.stroke(); ctx.setLineDash([])

      // Row height
      const rowH = wfH / SPANS.length

      SPANS.forEach((span, i) => {
        const ry = wfY + i * rowH
        const rcx = ry + rowH / 2
        const indent = span.depth * 12

        // Label
        ctx.font = `450 10px "DM Sans", system-ui, sans-serif`
        ctx.fillStyle = span.color + 'cc'
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
        ctx.fillText(span.label, padX + indent, rcx)

        // Bar background
        const bx = barX + barW * span.start
        const bw = barW * (span.end - span.start)
        const bh = rowH * 0.52
        const by = ry + (rowH - bh) / 2

        ctx.beginPath(); drawRoundedRect(bx, by, bw, bh, 3)
        ctx.fillStyle = span.color + '18'; ctx.fill()
        ctx.strokeStyle = span.color + '30'; ctx.lineWidth = 0.5; ctx.stroke()

        // Animated fill progress
        const fillT = Math.min(1, Math.max(0, (scanT - span.start) / (span.end - span.start)))
        if (fillT > 0) {
          ctx.beginPath(); drawRoundedRect(bx, by, bw * fillT, bh, 3)
          ctx.fillStyle = span.color + '55'; ctx.fill()
        }

        // Row separator
        if (i > 0) {
          ctx.strokeStyle = 'rgba(30,30,45,0.8)'; ctx.lineWidth = 0.5
          ctx.setLineDash([]); ctx.beginPath()
          ctx.moveTo(padX, ry); ctx.lineTo(W - padX, ry); ctx.stroke()
        }
      })

      // Time axis
      const axY = wfY + wfH + 6
      ctx.strokeStyle = 'rgba(91,141,238,0.2)'; ctx.lineWidth = 0.5
      ctx.beginPath(); ctx.moveTo(barX, axY); ctx.lineTo(barX + barW, axY); ctx.stroke()
        ;['0', '50ms', '100ms', '150ms', '200ms'].forEach((lbl, i) => {
          const tx = barX + (barW / 4) * i
          ctx.beginPath(); ctx.moveTo(tx, axY); ctx.lineTo(tx, axY + 4); ctx.stroke()
          ctx.font = '400 8px "DM Sans", system-ui, sans-serif'
          ctx.fillStyle = '#404050'; ctx.textAlign = 'center'
          ctx.fillText(lbl, tx, axY + 12)
        })

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    const canvasEl = canvasRef.current
    if (canvasEl?.parentElement) ro.observe(canvasEl.parentElement)

    // Pause the loop when off-screen + honor reduced-motion
    let running = false
    const start = () => { if (!running) { running = true; rafRef.current = requestAnimationFrame(draw) } }
    const stop = () => { running = false; cancelAnimationFrame(rafRef.current) }
    let cleanupVis = () => {}
    if (prefersReducedMotion()) {
      draw(); stop()
    } else if (canvasEl?.parentElement) {
      cleanupVis = observeVisibility(canvasEl.parentElement, v => (v ? start() : stop()))
    } else {
      start()
    }
    return () => { stop(); ro.disconnect(); cleanupVis() }
  }, [])

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      borderRadius: 16, overflow: 'hidden',
      background: 'rgba(10,10,16,0.6)', border: '1px solid rgba(91,141,238,0.1)'
    }}>
      <canvas ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        aria-hidden="true" />
    </div>
  )
}
