'use client'
import { useEffect, useRef } from 'react'
import { prefersReducedMotion, observeVisibility } from '@/lib/canvasMotion'

// City/region hotspots on the globe [lat, lng, label]
const HOTSPOTS: [number, number, string][] = [
  [51.5, -0.1, 'London'],
  [48.8, 2.3, 'Paris'],
  [52.5, 13.4, 'Berlin'],
  [40.7, -74.0, 'New York'],
  [37.8, -122.4, 'San Francisco'],
  [1.3, 103.8, 'Singapore'],
  [35.7, 139.7, 'Tokyo'],
  [55.7, 37.6, 'Moscow'],
  [-23.5, -46.6, 'São Paulo'],
  [25.2, 55.3, 'Dubai'],
  [19.1, 72.8, 'Mumbai'],
  [-33.9, 18.4, 'Cape Town'],
  [43.7, 87.3, 'Central Asia'],
  [45.4, -75.7, 'Ottawa'],
  [59.9, 10.7, 'Oslo'],
]

// Connection arcs between cities [from, to]
const ARCS: [number, number][] = [
  [0, 3], [0, 1], [0, 2], [3, 4], [4, 6],
  [1, 9], [2, 7], [6, 5], [5, 10], [3, 14],
  [7, 12], [9, 10], [3, 8], [0, 4], [5, 6],
]

function latLngToXY(lat: number, lng: number, cx: number, cy: number, r: number, tilt: number, rot: number) {
  const phi = (90 - lat) * Math.PI / 180
  const theta = (lng + rot) * Math.PI / 180
  const x = r * Math.sin(phi) * Math.cos(theta)
  const y = r * Math.cos(phi)
  const z = r * Math.sin(phi) * Math.sin(theta)
  // apply tilt
  const ty = y * Math.cos(tilt) - z * Math.sin(tilt)
  const tz = y * Math.sin(tilt) + z * Math.cos(tilt)
  return { sx: cx + x, sy: cy + ty, z: tz, visible: tz > -r * 0.1 }
}

export default function GlobeGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    let rot = 0

    function resize() {
      const canvasEl = canvasRef.current
      if (!canvasEl) return
      const p = canvasEl.parentElement
      if (!p) return
      const W = p.offsetWidth, H = p.offsetHeight
      canvasEl.width = W * dpr; canvasEl.height = H * dpr
      canvasEl.style.width = W + 'px'; canvasEl.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw() {
      const canvasEl = canvasRef.current
      if (!canvasEl) { rafRef.current = requestAnimationFrame(draw); return }
      const W = canvasEl.offsetWidth, H = canvasEl.offsetHeight
      if (!W || !H) { rafRef.current = requestAnimationFrame(draw); return }
      ctx.clearRect(0, 0, W, H)

      rot += 0.08
      const cx = W * 0.5, cy = H * 0.5
      const r = Math.min(W, H) * 0.38
      const tilt = 0.38 // radians ~22°

      // ── Atmosphere glow ──
      const atm = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r * 1.35)
      atm.addColorStop(0, 'rgba(91,141,238,0.18)')
      atm.addColorStop(0.5, 'rgba(91,141,238,0.06)')
      atm.addColorStop(1, 'rgba(91,141,238,0)')
      ctx.fillStyle = atm
      ctx.beginPath(); ctx.arc(cx, cy, r * 1.35, 0, Math.PI * 2); ctx.fill()

      // ── Globe base ──
      const base = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.2, r * 0.05, cx, cy, r)
      base.addColorStop(0, 'rgba(30,40,80,0.95)')
      base.addColorStop(0.6, 'rgba(14,18,40,0.98)')
      base.addColorStop(1, 'rgba(8,10,24,1)')
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = base; ctx.fill()

      // ── Lat/Lng grid ──
      ctx.strokeStyle = 'rgba(91,141,238,0.07)'
      ctx.lineWidth = 0.6
      // Latitude lines
      for (let lat = -75; lat <= 75; lat += 30) {
        ctx.beginPath()
        let first = true
        for (let lng = -180; lng <= 180; lng += 4) {
          const p = latLngToXY(lat, lng, cx, cy, r, tilt, rot)
          if (!p.visible) { first = true; continue }
          if (first) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy)
          first = false
        }
        ctx.stroke()
      }
      // Longitude lines
      for (let lng = 0; lng < 360; lng += 30) {
        ctx.beginPath()
        let first = true
        for (let lat = -85; lat <= 85; lat += 4) {
          const p = latLngToXY(lat, lng, cx, cy, r, tilt, rot)
          if (!p.visible) { first = true; continue }
          if (first) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy)
          first = false
        }
        ctx.stroke()
      }

      // ── Dot field (simulates landmass texture) ──
      const t = performance.now() / 1000
      const LAND_DOTS: [number, number][] = [
        // Europe
        [51, 0], [48, 2], [52, 13], [55, 23], [50, 14], [47, 8], [56, 10], [60, 10], [64, 26], [68, 28],
        [45, 15], [41, 12], [38, 15], [40, 28], [37, 35],
        // North America
        [40, -74], [37, -122], [45, -75], [49, -123], [60, -114], [65, -130], [55, -100], [30, -95], [35, -78], [44, -80],
        // Asia
        [35, 139], [25, 121], [1, 103], [13, 80], [19, 72], [55, 37], [43, 87], [30, 120], [45, 130], [60, 90], [52, 60],
        // South America
        [-23, -46], [-34, -58], [-12, -77], [4, -74], [10, -66], [-15, -56], [-5, -35],
        // Africa
        [-33, 18], [0, 20], [6, 3], [15, 32], [30, 31], [33, 13], [-18, 46], [1, 38],
        // Oceania
        [-33, 151], [-37, 144], [-27, 153], [-31, 116],
      ]

      LAND_DOTS.forEach(([lat, lng]) => {
        const p = latLngToXY(lat, lng, cx, cy, r * 0.99, tilt, rot)
        if (!p.visible) return
        const brightness = 0.4 + (p.z / r) * 0.5
        ctx.fillStyle = `rgba(91,141,238,${brightness * 0.35})`
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 1.8, 0, Math.PI * 2); ctx.fill()
      })

      // ── Connection arcs ──
      const hotPos = HOTSPOTS.map(([lat, lng]) => latLngToXY(lat, lng, cx, cy, r, tilt, rot))

      ARCS.forEach(([ai, bi]) => {
        const a = hotPos[ai], b = hotPos[bi]
        if (!a.visible || !b.visible) return
        const arcT = (Math.sin(t * 0.8 + ai) + 1) / 2 // animated progress 0-1
        const steps = 40
        ctx.beginPath()
        for (let i = 0; i <= steps; i++) {
          const frac = i / steps
          if (frac > arcT) break
          // interpolate along great circle (simplified: midpoint lifted)
          const liftR = r * (1 + 0.18 * Math.sin(frac * Math.PI))
          const lat = HOTSPOTS[ai][0] + (HOTSPOTS[bi][0] - HOTSPOTS[ai][0]) * frac
          const lng = HOTSPOTS[ai][1] + (HOTSPOTS[bi][1] - HOTSPOTS[ai][1]) * frac
          const p = latLngToXY(lat, lng, cx, cy, liftR, tilt, rot)
          if (!p.visible) break
          if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy)
        }
        const alpha = 0.15 + arcT * 0.35
        ctx.strokeStyle = `rgba(91,141,238,${alpha})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      })

      // ── Hotspot dots ──
      HOTSPOTS.forEach(([, , label], i) => {
        const p = hotPos[i]
        if (!p.visible) return
        const depth = (p.z / r + 1) / 2 // 0-1 depth
        if (depth < 0.1) return

        // Pulse animation per city
        const pulseT = (Math.sin(t * 1.5 + i * 0.9) + 1) / 2
        const pulsed = 2 + pulseT * 5

        // Outer ring
        ctx.beginPath(); ctx.arc(p.sx, p.sy, pulsed, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(91,141,238,${depth * 0.5 * (1 - pulseT * 0.6)})`
        ctx.lineWidth = 0.8; ctx.stroke()

        // Inner dot
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = depth > 0.5 ? '#5b8dee' : 'rgba(91,141,238,0.5)'
        ctx.fill()

        // Label for prominent cities
        if (depth > 0.7 && pulsed < 4) {
          ctx.font = `400 9px "DM Sans", system-ui, sans-serif`
          ctx.fillStyle = `rgba(160,160,178,${depth * 0.85})`
          ctx.textAlign = 'center'
          ctx.fillText(label, p.sx, p.sy - 8)
        }
      })

      // ── Specular highlight ──
      const spec = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.32, 0, cx - r * 0.2, cy - r * 0.2, r * 0.6)
      spec.addColorStop(0, 'rgba(255,255,255,0.04)')
      spec.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = spec; ctx.fill()

      // ── Globe border ──
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,141,238,0.2)'; ctx.lineWidth = 1; ctx.stroke()

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
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        aria-hidden="true"
      />
    </div>
  )
}
