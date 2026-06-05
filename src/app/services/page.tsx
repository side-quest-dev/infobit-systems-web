import type { Metadata } from 'next'
import Link from 'next/link'
import clsx from 'clsx'
import Icon from '@/components/ui/Icon'
import { siteConfig } from '@/lib/config'
import pageStyles from '@/components/ui/PageHero.module.scss'
import styles from './Services.module.scss'

export const metadata: Metadata = {
    title: 'Services',
    description: 'Platform architecture, backend development, cloud infrastructure and system optimization for high-traffic engineering teams.',
    alternates: { canonical: '/services' },
}

export default function ServicesPage() {
    return (
        <>
            <main>
                {/* Hero */}
                <section className={pageStyles.hero}>
                    <div className="wrap">
                        <div className={pageStyles.eyebrow}>
                            <span className={pageStyles.eyebrowLine} />
                            Services
                        </div>
                        <h1 className={pageStyles.h1}>
                            Four areas.<br />
                            <em>One focus.</em>
                        </h1>
                        <p className={pageStyles.desc}>
                            Every service we offer is focused on the same thing — building backend
                            systems that hold up under real production pressure. Architecture-first,
                            reliability-driven.
                        </p>
                    </div>
                </section>

                {/* List */}
                <section className={styles.section}>
                    <div className="wrap">
                        <div className={styles.list}>
                            {siteConfig.services.map((s, i) => (
                                <Link key={s.slug} href={`/services/${s.slug}`} className={styles.row}>
                                    <div className={clsx(styles.icon, styles[s.color])}>
                                        <Icon name={s.icon} size={32} />
                                    </div>
                                    <div className={styles.meta}>
                                        <div className={styles.rowHead}>
                                            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                                            <h2 className={styles.title}>{s.title}</h2>
                                        </div>
                                        <p className={styles.desc}>{s.shortDesc}</p>
                                    </div>
                                    <div className={styles.arrow} aria-hidden="true">→</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
