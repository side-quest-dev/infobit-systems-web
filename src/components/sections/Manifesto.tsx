import { siteConfig } from '@/lib/config'
import SectionHeader from '@/components/ui/SectionHeader'
import styles from './Manifesto.module.scss'

export default function Manifesto() {
    return (
        <section className={styles.section}>
            <div className="wrap">
                <div className={styles.layout}>
                    <div>
                        <SectionHeader
                            tag="Architecture thinking"
                            heading={<>Why architecture quality<br /><em>matters at scale.</em></>}
                        />
                        <p className={styles.intro}>
                            Most platform failures are not engineering failures. They are
                            architecture decisions made too early, under pressure, without
                            production context.
                        </p>
                    </div>

                    <div className={styles.items}>
                        {siteConfig.manifestoItems.map(item => (
                            <div key={item.label} className={styles.item}>
                                <div className={styles.label}>{item.label}</div>
                                <p className={styles.text}>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
