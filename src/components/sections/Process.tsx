import { siteConfig } from '@/lib/config'
import SectionHeader from '@/components/ui/SectionHeader'
import styles from './Process.module.scss'

export default function Process() {
    return (
        <section className={styles.section}>
            <div className="wrap">
                <SectionHeader
                    tag="How we work"
                    heading={<>Clear process. <em>No surprises.</em></>}
                    description="Enterprise clients need predictability as much as technical excellence."
                    center
                />

                <div className={styles.steps}>
                    {siteConfig.processSteps.map(step => (
                        <div key={step.n} className={styles.step}>
                            <div className={styles.num}>{step.n}</div>
                            <h3 className={styles.title}>{step.title}</h3>
                            <p className={styles.desc}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
