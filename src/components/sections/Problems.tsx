import { siteConfig } from '@/lib/config'
import SectionHeader from '@/components/ui/SectionHeader'
import Icon from '@/components/ui/Icon'
import styles from './Problems.module.scss'

export default function Problems() {
    return (
        <section className={styles.section} id="problems">
            <div className="wrap">
                <SectionHeader
                    tag="Problems we solve"
                    heading={<>Is your platform <em>holding you back?</em></>}
                    description="We work with companies facing real backend and architecture challenges — where the wrong decision costs months."
                />

                <div className={styles.grid}>
                    {siteConfig.problems.map((p, i) => (
                        <div key={i} className={styles.card}>
                            <div className={styles.icon}>
                                <Icon name={p.icon} size={36} />
                            </div>
                            <p className={styles.question}>{p.q}</p>
                            <p className={styles.answer}>{p.a}</p>
                        </div>
                    ))}

                    <div className={styles.wideCard}>
                        <div>
                            <div className={styles.wideTag}>Why it matters</div>
                            <h3 className={styles.wideHeading}>
                                We specialize in systems that can&apos;t afford to fail.
                            </h3>
                            <p className={styles.wideText}>
                                Most agencies build standard applications. We focus on high-scale
                                platforms, large backend systems and distributed cloud infrastructure —
                                the projects that fail when you hire the wrong team.
                            </p>
                        </div>
                        <div className={styles.bullets}>
                            {siteConfig.problemsBullets.map(b => (
                                <div key={b} className={styles.bullet}>
                                    <div className={styles.bulletDot} />
                                    <span>{b}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
