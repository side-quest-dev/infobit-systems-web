import { siteConfig } from '@/lib/config'
import SectionHeader from '@/components/ui/SectionHeader'
import styles from './Engagements.module.scss'

export default function Engagements() {
    return (
        <section className={styles.section}>
            <div className="wrap">
                <SectionHeader
                    tag="Engagement models"
                    heading={<>How companies <em>work with us</em></>}
                    description="Three ways to engage depending on what your project needs. All engagements start with a discovery call."
                    center
                />

                <div className={styles.grid}>
                    {siteConfig.engagements.map(e => (
                        <div key={e.title} className={styles.card}>
                            <span className={styles.badge}>{e.badge}</span>
                            <h3 className={styles.title}>{e.title}</h3>
                            <p className={styles.desc}>{e.desc}</p>
                            <ul className={styles.list}>
                                {e.items.map(item => (
                                    <li key={item} className={styles.item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
