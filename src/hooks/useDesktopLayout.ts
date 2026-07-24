import { useEffect } from 'react'
import { applyDesktopLayout, resetMobileLayout } from '../utils/layout'

export function useDesktopLayout(active: boolean): void {
  useEffect(() => {
    if (active) {
      applyDesktopLayout()
    } else {
      resetMobileLayout()
    }

    return () => {
      resetMobileLayout()
    }
  }, [active])

  useEffect(() => {
    if (!active) return

    const onResize = () => applyDesktopLayout()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [active])
}
