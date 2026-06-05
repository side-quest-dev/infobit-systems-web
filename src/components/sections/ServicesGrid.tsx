import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import SectionHeader from '@/components/ui/SectionHeader'
import Icon from '@/components/ui/Icon'
import clsx from 'clsx'
import styles from './ServicesGrid.module.scss'

export default function ServicesGrid() {
    return (
        <section className={styles.section} id="services">
            <div className="wrap">
                <SectionHeader
                    tag="Services"
                    heading={<>What we <em>deliver</em></>}
                    description="Four core service areas — each focused on where complex systems need the most expertise."
                    center
                />

                <div className={styles.grid}>
                    {siteConfig.services.map(s => (
                        <Link key={s.slug} href={`/services/${s.slug}`} className={styles.card}>
                            <div className={clsx(styles.icon, styles[s.color])}>
                                <Icon name={s.icon} size={32} />
                            </div>
                            <h3 className={styles.title}>{s.title}</h3>
                            <p className={styles.desc}>{s.shortDesc}</p>
                            <span className={styles.more}>Learn more →</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
