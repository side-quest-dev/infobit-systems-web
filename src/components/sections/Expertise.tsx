import { siteConfig } from '@/lib/config'
import SectionHeader from '@/components/ui/SectionHeader'
import styles from './Expertise.module.scss'

export default function Expertise() {
    return (
        <section className={styles.section} id="expertise">
            <div className="wrap">
                <div className={styles.layout}>
                    <div className={styles.sticky}>
                        <SectionHeader
                            tag="Technology"
                            heading={<>Our <em>technical</em> foundation</>}
                            description="Battle-tested technologies chosen for performance, reliability and long-term maintainability — not trend-chasing."
                        />
                    </div>

                    <div className={styles.groups}>
                        {siteConfig.expertiseGroups.map(group => (
                            <div key={group.tag} className={styles.group}>
                                <div className={styles.groupTag}>{group.tag}</div>
                                <div className={styles.rows}>
                                    {group.items.map(item => (
                                        <div key={item} className={styles.row}>
                                            <span className={styles.dash}>—</span>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
