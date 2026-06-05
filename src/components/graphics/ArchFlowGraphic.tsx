'use client'
import { useEffect, useRef } from 'react'

const LAYERS = [
  { label: 'Client Layer', sub: 'Web · Mobile · API Consumers', color: '#a0a0b2', y: 0.10 },
  { label: 'API Gateway', sub: 'Auth · Rate limit · Routing', color: '#5b8dee', y: 0.26 },
  { label: 'Domain Services', sub: 'Bounded contexts · DDD', color: '#5b8dee', y: 0.42 },
  { label: 'Event Bus', sub: 'Kafka · Async messaging', color: '#2dd4bf', y: 0.57 },
  { label: 'Data Layer', sub: 'PostgreSQL · Redis · Elastic', color: '#2dd4bf', y: 0.72 },
  { label: 'Infrastructure', sub: 'Kubernetes · AWS · Terraform', color: '#a0a0b2', y: 0.87 },
]

export default function ArchFlowGraphic() {
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

      const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number | number[]) => {
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, y, w, h, r)
          return
        }
        const radius = Array.isArray(r) ? Math.min(r[0], w / 2, h / 2) : Math.min(r, w / 2, h / 2)
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
        ctx.closePath()
      }

      // dot grid
      ctx.fillStyle = 'rgba(91,141,238,0.06)'
      for (let x = 20; x < W; x += 28) for (let y = 20; y < H; y += 28) {
        ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fill()
      }

      const padX = W * 0.08
      const boxH = H * 0.08
      const boxW = W - padX * 2

      // Animated data packets flowing downward between layers
      const flowT = (t * 0.4) % 1

      LAYERS.forEach((layer, i) => {
        const cy = layer.y * H
        const bx = padX, by = cy - boxH / 2

        // Connection line to next layer
        if (i < LAYERS.length - 1) {
          const nextY = LAYERS[i + 1].y * H
          const grad = ctx.createLinearGradient(0, cy, 0, nextY)
          grad.addColorStop(0, layer.color + '40')
          grad.addColorStop(1, LAYERS[i + 1].color + '40')
          ctx.strokeStyle = grad; ctx.lineWidth = 1
          ctx.setLineDash([4, 3])
          ctx.beginPath()
          ctx.moveTo(W * 0.5, cy + boxH / 2)
          ctx.lineTo(W * 0.5, nextY - boxH / 2)
          ctx.stroke(); ctx.setLineDash([])

          // Animated packet
          const gap = nextY - cy - boxH
          const py = cy + boxH / 2 + gap * ((flowT + i * 0.18) % 1)
          const col = layer.color
          const pg = ctx.createRadialGradient(W * 0.5, py, 0, W * 0.5, py, 8)
          pg.addColorStop(0, col + 'cc'); pg.addColorStop(1, col + '00')
          ctx.fillStyle = pg
          ctx.beginPath(); ctx.arc(W * 0.5, py, 8, 0, Math.PI * 2); ctx.fill()
          ctx.fillStyle = col
          ctx.beginPath(); ctx.arc(W * 0.5, py, 2.5, 0, Math.PI * 2); ctx.fill()
        }

        // Box glow
        const glow = ctx.createRadialGradient(bx + boxW / 2, cy, 0, bx + boxW / 2, cy, boxW * 0.6)
        glow.addColorStop(0, layer.color + '12')
        glow.addColorStop(1, layer.color + '00')
        ctx.fillStyle = glow; ctx.fillRect(bx - 20, by - 20, boxW + 40, boxH + 40)

        // Box border + fill
        ctx.beginPath(); drawRoundedRect(bx, by, boxW, boxH, 8)
        ctx.fillStyle = 'rgba(14,14,20,0.9)'; ctx.fill()
        ctx.strokeStyle = layer.color + '55'; ctx.lineWidth = 1; ctx.stroke()

        // Left accent bar
        ctx.beginPath(); drawRoundedRect(bx, by, 3, boxH, [8, 0, 0, 8])
        ctx.fillStyle = layer.color; ctx.fill()

        // Index number
        ctx.font = `700 10px "Syne", system-ui, sans-serif`
        ctx.fillStyle = layer.color + 'aa'
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
        ctx.fillText(`0${i + 1}`, bx + 14, cy)

        // Label
        ctx.font = `600 13px "DM Sans", system-ui, sans-serif`
        ctx.fillStyle = '#f2f2f3'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(layer.label, W * 0.5, cy - 7)

        // Sub
        ctx.font = `400 10px "DM Sans", system-ui, sans-serif`
        ctx.fillStyle = '#a0a0b2'
        ctx.fillText(layer.sub, W * 0.5, cy + 9)
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
      background: 'rgba(10,10,16,0.6)',
      border: '1px solid rgba(91,141,238,0.1)'
    }}>
      <canvas ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        aria-hidden="true" />
    </div>
  )
}
