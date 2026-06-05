'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import Button from '../ui/Button'
import styles from './Navbar.module.scss'

export default function MobileMenu() {
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    // Close on Escape key
    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false)
                buttonRef.current?.focus()
            }
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [open])

    // Focus first link when menu opens
    useEffect(() => {
        if (open) {
            const first = menuRef.current?.querySelector<HTMLElement>('a, button')
            first?.focus()
        }
    }, [open])

    return (
        <>
            <button
                ref={buttonRef}
                className={styles.mobileButton}
                onClick={() => setOpen(!open)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-menu"
            >
                {open ? '✕' : '☰'}
            </button>

            {open && (
                <div
                    id="mobile-menu"
                    ref={menuRef}
                    className={styles.mobileMenu}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                >
                    {siteConfig.nav.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={styles.mobileLink}
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Button href="/contact" onClick={() => setOpen(false)}>
                        Schedule a Call
                    </Button>
                </div>
            )}
        </>
    )
}
