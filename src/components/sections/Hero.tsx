'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import styles from './Hero.module.scss'
import Button from '../ui/Button'
import { siteConfig } from '@/lib/config'

const HeroGraphic = dynamic(() => import('@/components/graphics/HeroGraphic'), { ssr: false })

export default function Hero() {
    // Defer the canvas mount until the browser is idle, so the main thread
    // is free to paint the LCP <h1> first instead of competing with canvas init.
    const [showGraphic, setShowGraphic] = useState(false)
    useEffect(() => {
        const ric = (window as Window & {
            requestIdleCallback?: (cb: () => void) => number
        }).requestIdleCallback
        if (ric) {
            ric(() => setShowGraphic(true))
        } else {
            const t = setTimeout(() => setShowGraphic(true), 200)
            return () => clearTimeout(t)
        }
    }, [])

    return (
        <section className={styles.hero}>
            <div className="wrap">
                <div className={styles.grid}>
                    <div className={styles.content}>
                        <div className={styles.eyebrow}>
                            <span className={styles.eyebrowLine} />
                            Senior Engineering Consultancy
                        </div>

                        <h1 className={styles.h1}>
                            We build platforms<br />
                            that survive<br />
                            <em>real traffic.</em>
                        </h1>

                        <p className={styles.sub}>
                            Senior platform engineering consultancy focused on high-traffic
                            systems, architecture and cloud-native backend infrastructure.
                        </p>

                        <div className={styles.stack}>
                            {siteConfig.techStack.map(t => (
                                <span key={t} className={styles.pill}>{t}</span>
                            ))}
                        </div>

                        <div className={styles.btns}>
                            <Button href="/contact" showArrow>
                                Schedule a technical consultation
                            </Button>
                            <Button href="#problems" variant="secondary">
                                See how we help
                            </Button>
                        </div>
                    </div>

                    <div className={styles.graphicWrap}>
                        {showGraphic && <HeroGraphic />}
                    </div>
                </div>

                <div className={styles.scrollCue} aria-hidden="true">
                    <span className={styles.scrollLine} />
                    scroll
                </div>
            </div>
        </section>
    )
}
