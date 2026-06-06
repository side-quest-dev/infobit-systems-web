// Shared helpers for canvas graphics — pause animation when off-screen
// and respect the user's reduced-motion preference.

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Calls `onChange(visible)` whenever the element enters/leaves the viewport.
 * Returns a cleanup function that disconnects the observer.
 */
export function observeVisibility(
  el: Element,
  onChange: (visible: boolean) => void,
): () => void {
  const io = new IntersectionObserver(
    ([entry]) => onChange(entry.isIntersecting),
    // Start ~one screenful early so the canvas is already drawn by the time
    // it scrolls into view — no blank-then-appear delay.
    { threshold: 0, rootMargin: '400px 0px' },
  )
  io.observe(el)
  return () => io.disconnect()
}
