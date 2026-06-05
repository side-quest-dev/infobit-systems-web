import { siteConfig } from '@/lib/config'
import SectionHeader from '@/components/ui/SectionHeader'
import Icon from '@/components/ui/Icon'
import styles from './WhoWeAre.module.scss'

export default function WhoWeAre() {
    return (
        <section className={styles.section} id="about">
            <div className="wrap">
                <div className={styles.layout}>
                    <div>
                        <SectionHeader
                            tag="Who we are"
                            heading={<>Built by engineers who&apos;ve<br /><em>done it at scale.</em></>}
                        />
                        <p className={styles.body}>
                            InfoBit Systems is a platform engineering consultancy focused on backend
                            systems that hold up under real-world pressure — high-traffic platforms,
                            financial infrastructure and real-time systems where failure has direct
                            business cost.
                        </p>
                        <p className={styles.body}>
                            We work where most teams get things wrong. That specialization means
                            we&apos;ve encountered the failure modes others only discover after launch —
                            when it&apos;s already expensive to fix.
                        </p>

                        <div className={styles.signals}>
                            {siteConfig.values.slice(0, 4).map(s => (
                                <div key={s.title} className={styles.signal}>
                                    <div className={styles.signalIcon}>
                                        <Icon name={s.icon} size={18} />
                                    </div>
                                    <div>
                                        <div className={styles.signalTitle}>{s.title}</div>
                                        <div className={styles.signalDesc}>{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className={styles.experienceCard}>
                            <h3 className={styles.cardTitle}>Industry experience</h3>
                            <div className={styles.entries}>
                                {siteConfig.aboutExperience.map(e => (
                                    <div key={e.title} className={styles.entry}>
                                        <div className={styles.entryTitle}>{e.title}</div>
                                        <div className={styles.entryDesc}>{e.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.positionNote}>
                            <div className={styles.noteLabel}>Our position</div>
                            <p className={styles.noteText}>
                                We evaluate projects by technical complexity, not company size. A
                                smaller platform with a hard engineering problem is exactly the kind of
                                work we do. What we don&apos;t do is standard application development where
                                architecture is not a factor.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
