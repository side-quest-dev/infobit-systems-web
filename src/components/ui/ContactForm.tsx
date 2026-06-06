'use client'
import { useState } from 'react'
import clsx from 'clsx'
import type { FormStatus } from '@/types'
import { siteConfig } from '@/lib/config'
import styles from './ContactForm.module.scss'

const ENGAGEMENTS = [
  'Architecture Consulting',
  'Development Partnership',
  'Long-term Engineering Support',
  'Platform Architecture Design',
  'System Optimization',
  'Cloud Infrastructure',
  'Other',
]

const SCALES = [
  'Early stage — under 10k users/day',
  'Growing — 10k–100k users/day',
  'Scaling — 100k–1M users/day',
  'High-traffic — 1M+ users/day',
  'Transaction volume (not user-based)',
  'Not sure yet',
]

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setError(json.error || 'Something went wrong. Please try again.')
        return
      }
      // Push conversion event to dataLayer (GTM → GA4 "generate_lead")
      // Only non-PII fields are sent (no name/email/message).
      window.dataLayer?.push({
        event: 'generate_lead',
        engagement_type: data.engagement || 'unspecified',
        system_scale: data.scale || 'unspecified',
      })
      setStatus('success')
    } catch {
      setStatus('error')
      setError(`Unable to send your message. Please check your connection and try again, or email us directly at ${siteConfig.email}.`)
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h3 className={styles.successTitle}>Message sent.</h3>
        <p className={styles.successText}>
          We&apos;ll respond within 24 hours with a technical discussion in mind — not a sales call.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Honeypot — hidden from humans, bots tend to fill it. Server rejects if filled. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" placeholder="Your name" required className={styles.input} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" placeholder="you@company.com" required className={styles.input} />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" type="text" placeholder="Company name" className={styles.input} />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cf-engagement">Engagement type</label>
        <select id="cf-engagement" name="engagement" required className={styles.select}>
          <option value="">Select engagement type</option>
          {ENGAGEMENTS.map(e => <option key={e}>{e}</option>)}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cf-scale">Approximate system scale</label>
        <select id="cf-scale" name="scale" className={styles.select}>
          <option value="">Select scale</option>
          {SCALES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cf-message">Describe your system and challenge</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="What platform are you running? What's the scale? What problem are you trying to solve?"
          className={styles.textarea}
        />
      </div>

      {status === 'error' && (
        <p className={styles.error}>{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className={clsx(styles.submit, status === 'sending' && styles.disabled)}
      >
        {status === 'sending' ? 'Sending…' : 'Schedule a technical consultation →'}
      </button>
    </form>
  )
}
