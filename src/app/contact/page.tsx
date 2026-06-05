import type { Metadata } from 'next'
import ContactForm from '@/components/ui/ContactForm'
import Icon from '@/components/ui/Icon'
import { siteConfig } from '@/lib/config'
import styles from './Contact.module.scss'

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Schedule a technical consultation with InfoBit Systems. We respond within 24 hours. Engineering conversation, not a sales call.',
    alternates: { canonical: '/contact' },
}

export default function ContactPage() {
    return (
        <>
            <main>
                <section className={styles.section}>
                    <div className="wrap">
                        <div className={styles.grid}>
                            {/* Left */}
                            <div>
                                <div className={styles.eyebrow}><span />Get in touch</div>
                                <h1 className={styles.h1}>
                                    Have a scaling<br />challenge? Let&apos;s talk<br />
                                    <em>architecture.</em>
                                </h1>
                                <p className={styles.intro}>
                                    If you&apos;re running a high-traffic platform or building systems where
                                    reliability isn&apos;t optional — we want to hear about it.
                                </p>

                                <div className={styles.signals}>
                                    {siteConfig.contactSignals.map(s => (
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

                                <div className={styles.whenBox}>
                                    <div className={styles.whenTitle}>When companies usually contact us</div>
                                    <div className={styles.whenList}>
                                        {siteConfig.contactWhenItems.map(item => (
                                            <div key={item} className={styles.whenItem}>{item}</div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.directContact}>
                                    <div className={styles.directLabel}>Or email directly</div>
                                    <a href={`mailto:${siteConfig.email}`} className={styles.directEmail}>
                                        {siteConfig.email}
                                    </a>
                                </div>
                            </div>

                            {/* Right — form */}
                            <div className={styles.formCard}>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
