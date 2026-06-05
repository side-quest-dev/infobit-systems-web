'use client'
import clsx from 'clsx'
import { siteConfig } from '@/lib/config'
import { useFaq } from '@/hooks/useFaq'
import SectionHeader from '@/components/ui/SectionHeader'
import styles from './FAQ.module.scss'

export default function FAQ() {
    const { toggle, isOpen } = useFaq()

    return (
        <section className={styles.section}>
            <div className="wrap">
                <SectionHeader
                    tag="FAQ"
                    heading={<>Common <em>questions</em></>}
                    center
                />

                <div className={styles.list} role="list">
                    {siteConfig.faq.map((item, i) => (
                        <div
                            key={i}
                            className={clsx(styles.item, isOpen(i) && styles.open)}
                            role="listitem"
                        >
                            <button
                                className={styles.question}
                                onClick={() => toggle(i)}
                                aria-expanded={isOpen(i)}
                                aria-controls={`faq-body-${i}`}
                                id={`faq-btn-${i}`}
                            >
                                {item.q}
                                <span className={styles.toggle} aria-hidden="true">↓</span>
                            </button>

                            <div
                                id={`faq-body-${i}`}
                                role="region"
                                aria-labelledby={`faq-btn-${i}`}
                                className={styles.body}
                                style={{ maxHeight: isOpen(i) ? '1000px' : '0' }}
                            >
                                <p className={styles.answer}>{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
