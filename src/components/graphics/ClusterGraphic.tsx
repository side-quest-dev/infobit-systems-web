'use client'
import { useEffect, useRef } from 'react'

interface Pod { x: number; y: number; label: string; status: 'ok' | 'scale' | 'pending'; node: number }

const PODS: Pod[] = [
  // Node 0
  { x: 0.18, y: 0.28, label: 'api-pod-1', status: 'ok', node: 0 },
  { x: 0.28, y: 0.28, label: 'api-pod-2', status: 'ok', node: 0 },
  { x: 0.18, y: 0.42, label: 'auth-pod-1', status: 'ok', node: 0 },
  { x: 0.28, y: 0.42, label: 'auth-pod-2', status: 'scale', node: 0 },
  // Node 1
  { x: 0.50, y: 0.28, label: 'core-pod-1', status: 'ok', node: 1 },
  { x: 0.60, y: 0.28, label: 'core-pod-2', status: 'ok', node: 1 },
  { x: 0.50, y: 0.42, label: 'core-pod-3', status: 'ok', node: 1 },
  { x: 0.60, y: 0.42, label: 'worker-pod-1', status: 'pending', node: 1 },
  // Node 2
  { x: 0.80, y: 0.28, label: 'db-pod-1', status: 'ok', node: 2 },
  { x: 0.80, y: 0.42, label: 'cache-pod-1', status: 'ok', node: 2 },
]

const POD_COLOR = { ok: '#2dd4bf', scale: '#5b8dee', pending: '#f59e0b' }

export default function ClusterGraphic() {
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

      // ── Ingress / Load Balancer at top ──
      const ibx = W * 0.5, iby = H * 0.10
      ctx.beginPath(); drawRoundedRect(ibx - 60, iby - 14, 120, 28, 6)
      ctx.fillStyle = 'rgba(91,141,238,0.1)'; ctx.fill()
      ctx.strokeStyle = '#5b8dee55'; ctx.lineWidth = 1; ctx.stroke()
      ctx.font = '600 11px "DM Sans", system-ui, sans-serif'
      ctx.fillStyle = '#5b8dee'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('Ingress / Load Balancer', ibx, iby)

        // Lines from ingress to nodes
        ;[0.23, 0.55, 0.80].forEach(nx => {
          ctx.strokeStyle = 'rgba(91,141,238,0.2)'; ctx.lineWidth = 1
          ctx.setLineDash([4, 3])
          ctx.beginPath(); ctx.moveTo(ibx, iby + 14); ctx.lineTo(nx * W, H * 0.18); ctx.stroke()
          ctx.setLineDash([])
        })

      // ── Nodes ──
      const nodeData = [
        { cx: 0.23, label: 'Node 1', pods: [0, 1, 2, 3] },
        { cx: 0.55, label: 'Node 2', pods: [4, 5, 6, 7] },
        { cx: 0.80, label: 'Node 3', pods: [8, 9] },
      ]
      nodeData.forEach(nd => {
        const nx = nd.cx * W, ny = H * 0.34
        const nw = W * 0.20, nh = H * 0.30
        // Node box
        ctx.beginPath(); drawRoundedRect(nx - nw / 2, ny - nh / 2, nw, nh, 10)
        ctx.fillStyle = 'rgba(20,20,30,0.7)'; ctx.fill()
        ctx.strokeStyle = 'rgba(91,141,238,0.18)'; ctx.lineWidth = 1; ctx.stroke()
        ctx.font = '600 9px "Syne", system-ui, sans-serif'
        ctx.fillStyle = '#404050'; ctx.textAlign = 'center'; ctx.textBaseline = 'top'
        ctx.fillText(nd.label.toUpperCase(), nx, ny - nh / 2 + 6)
      })

      // ── Pods ──
      PODS.forEach((pod, i) => {
        const px = pod.x * W, py = pod.y * H
        const col = POD_COLOR[pod.status]
        const pulse = (Math.sin(t * 2 + i * 0.7) + 1) / 2

        // Glow
        if (pod.status !== 'ok') {
          const pg = ctx.createRadialGradient(px, py, 0, px, py, 18)
          pg.addColorStop(0, col + '30'); pg.addColorStop(1, col + '00')
          ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px, py, 18, 0, Math.PI * 2); ctx.fill()
        }

        // Pod square
        const ps = 16
        ctx.beginPath(); drawRoundedRect(px - ps / 2, py - ps / 2, ps, ps, 4)
        ctx.fillStyle = col + '22'; ctx.fill()
        ctx.strokeStyle = col + (pod.status === 'pending' ? '88' : 'bb'); ctx.lineWidth = 1; ctx.stroke()

        // Status dot
        ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = col; ctx.fill()

        // Pending blink
        if (pod.status === 'pending') {
          ctx.globalAlpha = 0.3 + pulse * 0.7
          ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2)
          ctx.fillStyle = col; ctx.fill()
          ctx.globalAlpha = 1
        }
      })

      // ── Bottom: Storage layer ──
      const stores = [
        { x: 0.22, label: 'PostgreSQL', color: '#2dd4bf' },
        { x: 0.50, label: 'Redis', color: '#5b8dee' },
        { x: 0.78, label: 'S3 / Blob', color: '#a0a0b2' },
      ]
      stores.forEach(s => {
        const sx = s.x * W, sy = H * 0.80
        ctx.beginPath(); drawRoundedRect(sx - 48, sy - 14, 96, 28, 6)
        ctx.fillStyle = 'rgba(14,14,20,0.8)'; ctx.fill()
        ctx.strokeStyle = s.color + '44'; ctx.lineWidth = 1; ctx.stroke()
        ctx.font = '500 10px "DM Sans", system-ui, sans-serif'
        ctx.fillStyle = s.color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(s.label, sx, sy)
        // Line to node layer
        ctx.strokeStyle = s.color + '22'; ctx.lineWidth = 1
        ctx.setLineDash([3, 3])
        ctx.beginPath(); ctx.moveTo(sx, sy - 14); ctx.lineTo(sx, H * 0.50); ctx.stroke()
        ctx.setLineDash([])
      })

      // ── Monitoring row ──
      const monY = H * 0.92
        ;[{ l: 'Prometheus', c: '#f59e0b' }, { l: 'Grafana', c: '#5b8dee' }, { l: 'AlertManager', c: '#2dd4bf' }].forEach((m, i) => {
          const mx = (0.20 + i * 0.30) * W
          ctx.font = '500 9px "DM Sans", system-ui, sans-serif'
          ctx.fillStyle = m.c + '99'; ctx.textAlign = 'center'
          ctx.fillText('● ' + m.l, mx, monY)
        })

      // ── Animated packet from ingress ──
      const pkT = (t * 0.5) % 1
      const targetNode = nodeData[Math.floor(t * 0.5) % 3]
      const pkx = W * 0.5 + (targetNode.cx * W - W * 0.5) * pkT
      const pky = H * 0.10 + (H * 0.34 - H * 0.10) * pkT
      const pg2 = ctx.createRadialGradient(pkx, pky, 0, pkx, pky, 10)
      pg2.addColorStop(0, 'rgba(91,141,238,0.9)'); pg2.addColorStop(1, 'rgba(91,141,238,0)')
      ctx.fillStyle = pg2; ctx.beginPath(); ctx.arc(pkx, pky, 10, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#5b8dee'; ctx.beginPath(); ctx.arc(pkx, pky, 2.5, 0, Math.PI * 2); ctx.fill()

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
