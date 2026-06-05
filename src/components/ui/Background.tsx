import styles from './Background.module.scss';

export default function Background() {
    return (
        <>
            <div className={styles.gridBg} aria-hidden="true" />
            <div className={`${styles.orb} ${styles.orb1}`} aria-hidden="true" />
            <div className={`${styles.orb} ${styles.orb2}`} aria-hidden="true" />
            <div className={`${styles.orb} ${styles.orb3}`} aria-hidden="true" />
        </>
    )
}