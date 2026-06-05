import Button from '@/components/ui/Button'
import styles from './HomeCTA.module.scss'

export default function HomeCTA() {
    return (
        <section className={styles.section}>
            <div className="wrap">
                <div className={styles.inner}>
                    <h2 className={styles.heading}>
                        Have a scaling challenge?<br />Let&apos;s talk architecture.
                    </h2>
                    <p className={styles.sub}>
                        If you&apos;re running a high-traffic platform or building systems where
                        reliability isn&apos;t optional — we want to hear about it.
                    </p>
                    <p className={styles.note}>
                        We respond within <span>24 hours.</span> All consultations are technical, not sales calls.
                    </p>
                    <Button href="/contact" size="large" showArrow>
                        Schedule a technical consultation
                    </Button>
                </div>
            </div>
        </section>
    )
}
