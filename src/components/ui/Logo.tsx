import styles from './Logo.module.scss'

export default function Logo() {
    return (
        <div className={styles.logo}>
            <svg viewBox="0 0 36 36" width="28" height="28" fill="none" aria-hidden="true">
                <defs>
                    <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#5b8dee" />
                        <stop offset="100%" stopColor="#2dd4bf" />
                    </linearGradient>
                </defs>
                <path d="M18 3L31 10.5V25.5L18 33L5 25.5V10.5L18 3Z" stroke="url(#logo-grad)" strokeWidth="1.5" />
                <path d="M18 11L23 14V20L18 23L13 20V14L18 11Z" fill="url(#logo-grad)" opacity="0.25" />
                <path d="M18 11L23 14V20L18 23L13 20V14L18 11Z" stroke="url(#logo-grad)" strokeWidth="0.75" />
            </svg>
            <div className={styles.wordmark}>
                <span className={styles.name}>InfoBit</span>
                <span className={styles.systems}>Systems</span>
            </div>
        </div>
    )
}
