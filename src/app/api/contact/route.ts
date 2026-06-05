import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { siteConfig } from '@/lib/config'

// Sliding window rate limiter: max 5 requests per IP per 10 minutes
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const ipLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (ipLog.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
  if (timestamps.length >= MAX_REQUESTS) return true
  ipLog.set(ip, [...timestamps, now])
  return false
}

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes before trying again.' },
      { status: 429 }
    )
  }

  try {
    const { name, email, company, engagement, scale, message } = await req.json()

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) {
      return NextResponse.json({ error: 'Please describe your challenge in 10 to 5000 characters.' }, { status: 400 })
    }
    if (company && (typeof company !== 'string' || company.length > 200)) {
      return NextResponse.json({ error: 'Company name is too long.' }, { status: 400 })
    }

    // Strip newlines from header fields to prevent email header injection
    const safeName = name.replace(/[\r\n]/g, ' ').trim()
    const safeCompany = company ? company.replace(/[\r\n]/g, ' ').trim() : company

    // ── Create Gmail transporter ─────────────────────────────────────────
    // Set SMTP_USER and SMTP_PASSWORD in .env.local
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // ── Email to InfoBit Systems team ────────────────────────────────────
    await transporter.sendMail({
      from: `"InfoBit Systems Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
      replyTo: email,
      subject: `New inquiry from ${safeName}${safeCompany ? ` (${safeCompany})` : ''}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #111; margin-bottom: 1.5rem; border-bottom: 2px solid #5b8dee; padding-bottom: 0.75rem;">
            New Project Inquiry
          </h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:0.5rem 0; color:#555; width:160px; font-weight:600;">Name</td><td style="padding:0.5rem 0; color:#111;">${esc(name)}</td></tr>
            <tr><td style="padding:0.5rem 0; color:#555; font-weight:600;">Email</td><td style="padding:0.5rem 0;"><a href="mailto:${esc(email)}" style="color:#5b8dee;">${esc(email)}</a></td></tr>
            ${company ? `<tr><td style="padding:0.5rem 0; color:#555; font-weight:600;">Company</td><td style="padding:0.5rem 0; color:#111;">${esc(company)}</td></tr>` : ''}
            ${engagement ? `<tr><td style="padding:0.5rem 0; color:#555; font-weight:600;">Engagement</td><td style="padding:0.5rem 0; color:#111;">${esc(engagement)}</td></tr>` : ''}
            ${scale ? `<tr><td style="padding:0.5rem 0; color:#555; font-weight:600;">System scale</td><td style="padding:0.5rem 0; color:#111;">${esc(scale)}</td></tr>` : ''}
          </table>
          <div style="margin-top:1.5rem; padding:1.25rem; background:#fff; border-left:3px solid #5b8dee; border-radius:4px;">
            <p style="color:#555; font-weight:600; margin-bottom:0.5rem;">Message</p>
            <p style="color:#111; line-height:1.7; white-space:pre-wrap;">${esc(message)}</p>
          </div>
          <p style="margin-top:1.5rem; font-size:0.8rem; color:#999;">Sent from ${siteConfig.url} contact form</p>
        </div>
      `,
    })

    // ── Auto-reply to sender ─────────────────────────────────────────────
    await transporter.sendMail({
      from: `"InfoBit Systems" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'We received your inquiry — InfoBit Systems',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 2rem; color: #111;">
          <h2 style="color: #111; margin-bottom: 1rem;">Hi ${esc(name)},</h2>
          <p style="color: #444; line-height: 1.7; margin-bottom: 1rem;">
            Thank you for reaching out to InfoBit Systems. We've received your message and will respond within <strong>24 hours</strong>.
          </p>
          <p style="color: #444; line-height: 1.7; margin-bottom: 1rem;">
            Our response will be from an engineer, not a sales representative — we'll focus on understanding your technical challenge before discussing anything else.
          </p>
          <p style="color: #444; line-height: 1.7; margin-bottom: 2rem;">
            If you have any additional information to share in the meantime, simply reply to this email.
          </p>
          <div style="border-top: 1px solid #eee; padding-top: 1.5rem; color: #777; font-size: 0.85rem;">
            <p><strong style="color:#111;">InfoBit Systems</strong></p>
            <p>Platform Engineering Consultancy</p>
            <p><a href="${siteConfig.url}" style="color:#5b8dee;">${siteConfig.url.replace('https://', '')}</a></p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
