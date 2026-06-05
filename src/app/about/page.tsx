import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import SectionHeader from '@/components/ui/SectionHeader'
import { siteConfig } from '@/lib/config'
import styles from './About.module.scss'
import pageStyles from '@/components/ui/PageHero.module.scss'

export const metadata: Metadata = {
    title: 'About',
    description: 'InfoBit Systems is a senior platform engineering consultancy built by engineers with direct experience in high-traffic systems, enterprise backend architecture and production cloud infrastructure.',
    alternates: { canonical: '/about' },
}

export default function AboutPage() {
    return (
        <>
            <main>
                {/* Page hero */}
                <section className={pageStyles.hero}>
                    <div className="wrap">
                        <div className={pageStyles.eyebrow}>
                            <span className={pageStyles.eyebrowLine} />
                            About
                        </div>
                        <h1 className={pageStyles.h1}>
                            Built by engineers who&apos;ve<br />
                            <em>done it at scale.</em>
                        </h1>
                        <p className={pageStyles.desc}>
                            InfoBit Systems is a platform engineering consultancy focused on backend
                            systems that hold up under real-world pressure — high-traffic platforms,
                            financial infrastructure and real-time systems where failure has direct
                            business cost.
                        </p>
                    </div>
                </section>

                {/* Story */}
                <section className={styles.story}>
                    <div className="wrap">
                        <div className={styles.storyGrid}>
                            <div>
                                <div className={styles.storyTag}><span />Who we are</div>
                                <h2 className={styles.storyHeading}>
                                    We work where most teams<br /><em>get things wrong.</em>
                                </h2>
                                <p className={styles.storyBody}>
                                    InfoBit Systems was founded by engineers with direct experience in
                                    high-traffic production systems — betting platforms processing millions
                                    of events, fintech backends handling large transaction volumes and
                                    enterprise SaaS platforms with complex multi-tenant architectures.
                                </p>
                                <p className={styles.storyBody}>
                                    That specialization means we&apos;ve encountered the failure modes that other
                                    teams only discover after launch — when it&apos;s already expensive to fix.
                                    Architecture decisions that seemed reasonable at 1,000 users become
                                    existential problems at 1,000,000.
                                </p>
                                <p className={styles.storyBody}>
                                    We focus on reliability, performance and systems designed to last — not
                                    quick solutions that need rebuilding in two years. Every engagement
                                    starts with architecture, not code.
                                </p>
                            </div>

                            <div>
                                <div className={styles.expCard}>
                                    <h3 className={styles.expCardTitle}>Industry experience</h3>
                                    <div className={styles.expEntries}>
                                        {siteConfig.aboutExperience.map(e => (
                                            <div key={e.title} className={styles.expEntry}>
                                                <div className={styles.expEntryTitle}>{e.title}</div>
                                                <div className={styles.expEntryDesc}>{e.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.posNote}>
                                    <div className={styles.posNoteLabel}>Our position</div>
                                    <p className={styles.posNoteText}>
                                        We evaluate projects by technical complexity, not company size. A
                                        smaller platform with a hard engineering problem is exactly the kind
                                        of work we do. What we don&apos;t do is standard application development
                                        where architecture is not a factor.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className={styles.values}>
                    <div className="wrap">
                        <SectionHeader
                            tag="How we operate"
                            heading={<>Six principles that<br /><em>define our work.</em></>}
                        />
                        <div className={styles.valuesGrid}>
                            {siteConfig.values.map(v => (
                                <div key={v.title} className={styles.valueCard}>
                                    <div className={styles.valueIcon}>
                                        <Icon name={v.icon} size={18} />
                                    </div>
                                    <div>
                                        <div className={styles.valueTitle}>{v.title}</div>
                                        <div className={styles.valueDesc}>{v.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.cta}>
                    <div className="wrap">
                        <h2 className={styles.ctaHeading}>Ready to discuss your platform?</h2>
                        <p className={styles.ctaDesc}>
                            A 30-minute technical discovery call — no sales pitch, just engineering conversation.
                        </p>
                        <Button href="/contact" size="large" showArrow>Schedule a call</Button>
                    </div>
                </section>
            </main>
        </>
    )
}
