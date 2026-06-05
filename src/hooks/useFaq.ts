'use client'
import { useState, useCallback } from 'react'

export function useFaq(initialOpen: number | null = null) {
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpen)

  const toggle = useCallback((index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }, [])

  const isOpen = useCallback(
    (index: number) => openIndex === index,
    [openIndex],
  )

  return { toggle, isOpen }
}
