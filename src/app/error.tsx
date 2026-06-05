'use client'

import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import styles from './NotFound.module.scss'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main>
            <section className={styles.section}>
                <div>
                    <div className={styles.code}>500</div>
                    <h1 className={styles.heading}>Something went wrong.</h1>
                    <p className={styles.desc}>
                        An unexpected error occurred. Please try again, or return home.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button onClick={reset}>Try again</Button>
                        <Button href="/" variant="secondary" showArrow>Back to home</Button>
                    </div>
                </div>
            </section>
        </main>
    )
}
