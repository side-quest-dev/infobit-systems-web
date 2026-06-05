import Link from 'next/link'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import MobileMenu from './MobileMenu'
import { siteConfig } from '@/lib/config'
import styles from './Navbar.module.scss'

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.inner}>
                <Link href="/" aria-label="InfoBit Systems home">
                    <Logo />
                </Link>

                <ul className={styles.desktopMenu}>
                    {siteConfig.nav.map(item => (
                        <li key={item.href}>
                            <Link href={item.href} className={styles.navLink}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Button href="/contact" size="small">
                            Schedule a Call
                        </Button>
                    </li>
                </ul>

                <MobileMenu />
            </div>
        </nav>
    )
}
