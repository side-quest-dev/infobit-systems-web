import { Fragment } from 'react'
import { siteConfig } from '@/lib/config'
import styles from './TrustBar.module.scss'

export default function TrustBar() {
    return (
        <div className={styles.bar}>
            <div className="wrap">
                <div className={styles.row}>
                    {siteConfig.metrics.map((m, i) => (
                        <Fragment key={m.label}>
                            <div className={styles.item}>
                                <span className={styles.value}>{m.value}</span>
                                <span className={styles.label}>{m.label}</span>
                            </div>
                            {i < siteConfig.metrics.length - 1 && (
                                <div className={styles.sep} aria-hidden="true" />
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}
