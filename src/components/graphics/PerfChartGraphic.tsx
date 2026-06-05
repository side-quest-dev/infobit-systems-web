'use client'
import { useEffect, useRef } from 'react'

export default function PerfChartGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1

    // Pre-generate latency curve: spike → optimization → recovery
    const POINTS = 120
    const rawCurve: number[] = []
    const optCurve: number[] = []
    for (let i = 0; i < POINTS; i++) {
      const x = i / POINTS
      // Raw: builds up, spikes, stays high
      const raw = 0.15 + 0.12 * Math.sin(x * 6) +
        0.45 * Math.max(0, Math.min(1, (x - 0.25) * 4)) +
        0.08 * Math.random()
      rawCurve.push(Math.min(0.95, raw))
      // Optimized: flat, small variance
      const opt = 0.12 + 0.04 * Math.sin(x * 9 + 1) + 0.02 * Math.random()
      optCurve.push(opt)
    }

    function resize() {
      const canvasEl = canvasRef.current
      if (!canvasEl) return
      const p = canvasEl.parentElement
      if (!p) return
      canvasEl.width = p.offsetWidth * dpr; canvasEl.height = p.offsetHeight * dpr
      canvasEl.style.width = p.offsetWidth + 'px'; canvasEl.style.height = p.offsetHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function drawCurve(pts: number[], W: number, H: number, chartX: number, chartW: number, chartY: number, chartH: number, color: string, fill: boolean, progress: number) {
      const count = Math.floor(pts.length * progress)
      if (count < 2) return
      ctx.beginPath()
      for (let i = 0; i < count; i++) {
        const x = chartX + (i / (pts.length - 1)) * chartW
        const y = chartY + chartH - pts[i] * chartH
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      if (fill) {
        const lastX = chartX + ((count - 1) / (pts.length - 1)) * chartW
        ctx.lineTo(lastX, chartY + chartH)
        ctx.lineTo(chartX, chartY + chartH)
        ctx.closePath()
        const fg = ctx.createLinearGradient(0, chartY, 0, chartY + chartH)
        fg.addColorStop(0, color + '28')
        fg.addColorStop(1, color + '00')
        ctx.fillStyle = fg; ctx.fill()
        ctx.beginPath()
        for (let i = 0; i < count; i++) {
          const x = chartX + (i / (pts.length - 1)) * chartW
          const y = chartY + chartH - pts[i] * chartH
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
      }
      ctx.strokeStyle = color; ctx.lineWidth = 1.5
      ctx.lineJoin = 'round'; ctx.stroke()
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

      const padX = 16, padTop = 50, padBot = 36
      const chartX = padX + 28
      const chartW = W - chartX - padX
      const chartY = padTop
      const chartH = H - padTop - padBot

      // ── Metric pills at top ──
      const pills = [
        { label: 'BEFORE', val: '580ms p99', color: '#f87171' },
        { label: 'AFTER', val: '48ms p99', color: '#2dd4bf' },
        { label: 'GAIN', val: '−92%', color: '#5b8dee' },
      ]
      pills.forEach((p, i) => {
        const pw = 110, px = padX + i * (pw + 8)
        ctx.beginPath(); drawRoundedRect(px, 8, pw, 30, 6)
        ctx.fillStyle = p.color + '18'; ctx.fill()
        ctx.strokeStyle = p.color + '44'; ctx.lineWidth = 1; ctx.stroke()
        ctx.font = '700 8px "Syne", system-ui, sans-serif'
        ctx.fillStyle = p.color + 'cc'; ctx.textAlign = 'left'; ctx.textBaseline = 'top'
        ctx.fillText(p.label, px + 8, 12)
        ctx.font = '600 12px "DM Sans", system-ui, sans-serif'
        ctx.fillStyle = p.color; ctx.textBaseline = 'bottom'
        ctx.fillText(p.val, px + 8, 36)
      })

        // ── Y grid lines ──
        ;[0, 0.25, 0.5, 0.75, 1].forEach(frac => {
          const gy = chartY + chartH - frac * chartH
          ctx.strokeStyle = 'rgba(40,40,60,0.8)'; ctx.lineWidth = 0.5
          ctx.setLineDash([3, 3]); ctx.beginPath()
          ctx.moveTo(chartX, gy); ctx.lineTo(chartX + chartW, gy); ctx.stroke()
          ctx.setLineDash([])
          const ms = Math.round(frac * 600)
          ctx.font = '400 8px "DM Sans", system-ui, sans-serif'
          ctx.fillStyle = '#404050'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'
          ctx.fillText(ms + 'ms', chartX - 4, gy)
        })

      // ── Optimization marker ──
      const markerX = chartX + chartW * 0.42
      ctx.strokeStyle = 'rgba(245,158,11,0.4)'; ctx.lineWidth = 1
      ctx.setLineDash([4, 3])
      ctx.beginPath(); ctx.moveTo(markerX, chartY); ctx.lineTo(markerX, chartY + chartH)
      ctx.stroke(); ctx.setLineDash([])
      ctx.font = '600 9px "Syne", system-ui, sans-serif'
      ctx.fillStyle = '#f59e0b99'; ctx.textAlign = 'center'
      ctx.fillText('Optimization applied', markerX, chartY - 6)

      // ── Curves ──
      const loopT = (t * 0.25) % 1
      const prog = 0.3 + loopT * 0.7  // animate drawing progress

      drawCurve(rawCurve, W, H, chartX, chartW, chartY, chartH, '#f87171', true, prog)
      drawCurve(optCurve, W, H, chartX, chartW, chartY, chartH, '#2dd4bf', true, prog)

      // ── Moving dot on optimized line ──
      const dotI = Math.floor(prog * (POINTS - 1))
      const dotX = chartX + (dotI / (POINTS - 1)) * chartW
      const dotY = chartY + chartH - optCurve[dotI] * chartH
      const dg = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 10)
      dg.addColorStop(0, 'rgba(45,212,191,0.8)'); dg.addColorStop(1, 'rgba(45,212,191,0)')
      ctx.fillStyle = dg; ctx.beginPath(); ctx.arc(dotX, dotY, 10, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#2dd4bf'; ctx.beginPath(); ctx.arc(dotX, dotY, 3, 0, Math.PI * 2); ctx.fill()

      // ── Legend ──
      const legY = chartY + chartH + 16
        ;[{ c: '#f87171', l: 'Before optimization' }, { c: '#2dd4bf', l: 'After optimization' }].forEach((lg, i) => {
          const lx = chartX + i * (chartW * 0.5)
          ctx.fillStyle = lg.c; ctx.beginPath(); ctx.arc(lx + 6, legY, 4, 0, Math.PI * 2); ctx.fill()
          ctx.font = '400 10px "DM Sans", system-ui, sans-serif'
          ctx.fillStyle = '#a0a0b2'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
          ctx.fillText(lg.l, lx + 16, legY)
        })

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    const canvasEl = canvasRef.current
    if (canvasEl?.parentElement) ro.observe(canvasEl.parentElement)
    rafRef.current = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect() }
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
