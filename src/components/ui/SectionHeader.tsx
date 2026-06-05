import clsx from 'clsx'
import styles from './SectionHeader.module.scss'

interface Props {
  tag: string
  heading: React.ReactNode
  description?: string
  center?: boolean
  className?: string
}

export default function SectionHeader({ tag, heading, description, center, className }: Props) {
  return (
    <div className={clsx(styles.sh, center && styles.center, className)}>
      <div className={styles.tag}>{tag}</div>
      <h2 className={styles.h2}>{heading}</h2>
      {description && <p className={styles.desc}>{description}</p>}
    </div>
  )
}
