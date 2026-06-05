'use client'

import dynamic from 'next/dynamic'
import { siteConfig } from '@/lib/config'
import SectionHeader from '@/components/ui/SectionHeader'
import Icon from '@/components/ui/Icon'
import styles from './Industries.module.scss'

const GlobeGraphic = dynamic(() => import('@/components/graphics/GlobeGraphic'), { ssr: false })

export default function Industries() {
    return (
        <section className={styles.section}>
            <div className="wrap">
                <div className={styles.layout}>
                    <div className={styles.globeWrap}>
                        <GlobeGraphic />
                    </div>

                    <div className={styles.right}>
                        <SectionHeader
                            tag="Industries"
                            heading={<>Where we <em>operate</em></>}
                            description="We focus on domains where performance, reliability and correctness directly affect business outcomes — globally."
                        />

                        <div className={styles.grid}>
                            {siteConfig.industries.map(ind => (
                                <div key={ind.title} className={styles.card}>
                                    <div className={styles.icon}>
                                        <Icon name={ind.icon} size={24} />
                                    </div>
                                    <h3 className={styles.title}>{ind.title}</h3>
                                    <p className={styles.desc}>{ind.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
