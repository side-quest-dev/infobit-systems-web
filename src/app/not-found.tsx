import type { Metadata } from 'next'
import styles from './NotFound.module.scss'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
    title: 'Page Not Found',
    robots: { index: false, follow: false },
}

export default function NotFound() {
    return (
        <>
            <main>
                <section className={styles.section}>
                    <div>
                        <div className={styles.code}>404</div>
                        <h1 className={styles.heading}>Page not found.</h1>
                        <p className={styles.desc}>This page doesn&apos;t exist or was moved.</p>
                        <Button href="/" showArrow>Back to home</Button>
                    </div>
                </section>
            </main>
        </>
    )
}
