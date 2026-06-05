'use client'
import { useEffect, useRef } from 'react'

const NODES = [
  { label: 'API Gateway', color: '#5b8dee', x: 0.50, y: 0.10, r: 6 },
  { label: 'Auth Service', color: '#a0a0b2', x: 0.22, y: 0.28, r: 4.5 },
  { label: 'Kafka Stream', color: '#2dd4bf', x: 0.78, y: 0.28, r: 4.5 },
  { label: 'Core Backend', color: '#5b8dee', x: 0.36, y: 0.50, r: 5 },
  { label: 'PostgreSQL', color: '#2dd4bf', x: 0.64, y: 0.50, r: 4.5 },
  { label: 'Kubernetes', color: '#a0a0b2', x: 0.18, y: 0.70, r: 4.5 },
  { label: 'Redis Cache', color: '#5b8dee', x: 0.50, y: 0.72, r: 4.5 },
  { label: 'Queue Worker', color: '#a0a0b2', x: 0.80, y: 0.70, r: 4.5 },
]
const EDGES = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [3, 6], [4, 6], [4, 7], [5, 6], [6, 7]]

export default function HeroGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1

    const packets = EDGES.map((_, i) => ({
      edge: i,
      t: i / EDGES.length,
      speed: 0.003 + Math.random() * 0.003,
    }))
    const pulses = NODES.map(() => ({ p: Math.random(), dir: 1 as 1 | -1 }))

    function resize() {
      const canvasEl = canvasRef.current
      if (!canvasEl) return
      const parent = canvasEl.parentElement
      if (!parent) return
      const W = parent.offsetWidth
      const H = parent.offsetHeight
      if (W === 0 || H === 0) return
      canvasEl.width = W * dpr
      canvasEl.height = H * dpr
      canvasEl.style.width = W + 'px'
      canvasEl.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

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

    function draw() {
      const canvasEl = canvasRef.current
      if (!canvasEl) { rafRef.current = requestAnimationFrame(draw); return }
      const W = canvasEl.offsetWidth
      const H = canvasEl.offsetHeight
      if (W === 0 || H === 0) { rafRef.current = requestAnimationFrame(draw); return }

      ctx.clearRect(0, 0, W, H)

      // Dot grid
      ctx.fillStyle = 'rgba(91,141,238,0.15)'
      for (let gx = 20; gx < W; gx += 30) {
        for (let gy = 20; gy < H; gy += 30) {
          ctx.beginPath(); ctx.arc(gx, gy, 1.5, 0, Math.PI * 2); ctx.fill()
        }
      }

      // Central glow
      const g = ctx.createRadialGradient(W * .5, H * .4, 0, W * .5, H * .4, W * .55)
      g.addColorStop(0, 'rgba(91,141,238,0.12)')
      g.addColorStop(.5, 'rgba(45,212,191,0.08)')
      g.addColorStop(1, 'transparent')
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)

      // Edges
      EDGES.forEach(([a, b]) => {
        const na = NODES[a], nb = NODES[b]
        const grad = ctx.createLinearGradient(na.x * W, na.y * H, nb.x * W, nb.y * H)
        grad.addColorStop(0, na.color + '88')
        grad.addColorStop(1, nb.color + '44')
        ctx.beginPath()
        ctx.moveTo(na.x * W, na.y * H)
        ctx.lineTo(nb.x * W, nb.y * H)
        ctx.strokeStyle = grad; ctx.lineWidth = 1.4
        ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([])
      })

      // Packets
      packets.forEach(pk => {
        pk.t += pk.speed; if (pk.t > 1) pk.t = 0
        const [a, b] = EDGES[pk.edge]
        const na = NODES[a], nb = NODES[b]
        const px = (na.x + (nb.x - na.x) * pk.t) * W
        const py = (na.y + (nb.y - na.y) * pk.t) * H
        const col = na.color
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 12)
        pg.addColorStop(0, col + 'bb'); pg.addColorStop(1, col + '00')
        ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px, py, 12, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill()
      })

      // Nodes
      NODES.forEach((n, i) => {
        const nx = n.x * W, ny = n.y * H
        pulses[i].p += 0.015 * pulses[i].dir
        if (pulses[i].p > 1 || pulses[i].p < 0) pulses[i].dir *= -1

        // Pulse ring
        const pr = n.r + 5 + pulses[i].p * 7
        ctx.beginPath(); ctx.arc(nx, ny, pr, 0, Math.PI * 2)
        ctx.strokeStyle = n.color + '28'; ctx.lineWidth = 1; ctx.stroke()

        // Glow
        const ng = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.r * 3.5)
        ng.addColorStop(0, n.color + '35'); ng.addColorStop(1, n.color + '00')
        ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(nx, ny, n.r * 3.5, 0, Math.PI * 2); ctx.fill()

        // Circle
        ctx.beginPath(); ctx.arc(nx, ny, n.r, 0, Math.PI * 2)
        ctx.fillStyle = '#1a1a20'; ctx.fill()
        ctx.strokeStyle = n.color + 'dd'; ctx.lineWidth = 3; ctx.stroke()

        // Inner dot
        ctx.beginPath(); ctx.arc(nx, ny, n.r * 0.42, 0, Math.PI * 2)
        ctx.fillStyle = n.color; ctx.fill()

        // Label pill
        ctx.font = '500 11px "DM Sans", system-ui, sans-serif'
        const tw = ctx.measureText(n.label).width
        const pw = tw + 18, ph = 22
        const plx = nx - pw / 2, ply = ny + n.r + 8
        drawRoundedRect(plx, ply, pw, ph, 6)
        ctx.fillStyle = '#0f0f14ee'; ctx.fill()
        ctx.strokeStyle = n.color + '30'; ctx.lineWidth = 1; ctx.stroke()
        ctx.fillStyle = '#c0c0d0'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(n.label, nx, ply + ph / 2)
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(() => { resize() })
    ro.observe(canvas.parentElement!)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '20px',
      overflow: 'hidden',
      background: 'rgba(13,13,20,0.95)',
      border: '2px solid rgba(91,141,238,0.25)',
      boxShadow: '0 0 100px rgba(91,141,238,0.15), inset 0 0 60px rgba(91,141,238,0.12)',
    }}>
      {/* gradient border top-left */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '20px', zIndex: 0,
        background: 'linear-gradient(135deg, rgba(91,141,238,0.1), rgba(45,212,191,0.05), transparent 60%)',
        pointerEvents: 'none',
      }} />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          display: 'block',
        }}
        aria-hidden="true"
      />
    </div>
  )
}
