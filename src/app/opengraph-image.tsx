import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'InfoBit Systems — Platform Engineering for High-Traffic Products'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          background: '#080809',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'center',
          padding: '80px',
          fontFamily: 'serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(91,141,238,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(45,212,191,0.08) 0%, transparent 50%)',
          display: 'flex',
        }} />

        {/* Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
          <svg viewBox="0 0 36 36" width="48" height="48" fill="none">
            <path d="M18 3L31 10.5V25.5L18 33L5 25.5V10.5L18 3Z" stroke="url(#og-g)" strokeWidth="1.5" />
            <path d="M18 11L23 14V20L18 23L13 20V14L18 11Z" fill="url(#og-g)" opacity="0.3" />
            <defs>
              <linearGradient id="og-g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5b8dee" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '28px', color: '#f2f2f3', fontStyle: 'italic' }}>InfoBit</span>
            <span style={{ fontSize: '10px', color: '#404050', letterSpacing: '3px', textTransform: 'uppercase', fontStyle: 'normal', fontFamily: 'sans-serif', fontWeight: 700 }}>Systems</span>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: '72px', fontWeight: 400, fontStyle: 'italic',
          color: '#f2f2f3', lineHeight: 1.05, margin: '0 0 24px 0',
          maxWidth: '800px', letterSpacing: '-2px',
        }}>
          Platform Engineering<br />
          <span style={{ color: '#5b8dee' }}>for High-Traffic</span><br />
          Products.
        </h1>

        {/* Descriptor */}
        <p style={{
          fontSize: '22px', color: '#a0a0b2', margin: '0 0 48px 0',
          fontFamily: 'sans-serif', fontWeight: 400, maxWidth: '700px',
          lineHeight: 1.5, fontStyle: 'normal',
        }}>
          Senior engineers. Architecture-first. Java · Spring Boot · Microservices · Kubernetes.
        </p>

        {/* URL */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5b8dee' }} />
          <span style={{ fontSize: '18px', color: '#5b8dee', fontFamily: 'sans-serif', fontWeight: 600 }}>
            infobit.systems
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
