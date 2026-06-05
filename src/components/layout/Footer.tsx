import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import Logo from '@/components/ui/Logo'
import styles from './Footer.module.scss'

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className={styles.footer}>
            <div className="wrap">
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <Link href="/" aria-label="InfoBit Systems home"><Logo /></Link>
                        <p>Scalable platform engineering for companies running high-traffic systems, real-time data pipelines and complex integrations.</p>
                    </div>
                    <div>
                        <p className={styles.colTitle}>Services</p>
                        <ul className={styles.linkList}>
                            {siteConfig.services.map(s => (
                                <li key={s.slug}><Link href={`/services/${s.slug}`} className={styles.link}>{s.title}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className={styles.colTitle}>Company</p>
                        <ul className={styles.linkList}>
                            <li><Link href="/about" className={styles.link}>About</Link></li>
                            <li><Link href="/contact" className={styles.link}>Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className={styles.colTitle}>Connect</p>
                        <ul className={styles.linkList}>
                            <li><a href={`mailto:${siteConfig.email}`} className={styles.link}>{siteConfig.email}</a></li>
                            <li><a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a></li>
                            <li><a href={siteConfig.x} target="_blank" rel="noopener noreferrer" className={styles.link}>X</a></li>
                            <li><a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <span>© {year} InfoBit Systems. All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}
