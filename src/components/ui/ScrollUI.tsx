'use client'
import clsx from 'clsx'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import styles from './ScrollUI.module.scss'

export default function ScrollUI() {
  const { progress, showBtt } = useScrollProgress()

  return (
    <>
      <div
        className={styles.progress}
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
      <button
        className={clsx(styles.btt, showBtt && styles.visible)}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        aria-hidden={!showBtt}
        tabIndex={showBtt ? 0 : -1}
      >
        ↑
      </button>
    </>
  )
}
