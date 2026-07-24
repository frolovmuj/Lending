import { isMobilePhone } from './device'

export const DESKTOP_LAYOUT_WIDTH = 1280

const ZOOMABLE = 'minimum-scale=0.25, maximum-scale=5, user-scalable=yes'
const DEFAULT_VIEWPORT = `width=device-width, initial-scale=1.0, ${ZOOMABLE}`
const MOBILE_VIEWPORT = `width=device-width, initial-scale=1.0, viewport-fit=cover, ${ZOOMABLE}`

function getViewportMeta(): HTMLMetaElement | null {
  return document.querySelector('meta[name="viewport"]')
}

/** На телефоне в «ПК-режиме» — фиксированная ширина, чтобы не срабатывали mobile @media. */
export function applyDesktopLayout(): void {
  document.documentElement.classList.add('site-desktop')

  const meta = getViewportMeta()
  if (!meta) return

  if (isMobilePhone()) {
    const scale = Math.min(1, window.innerWidth / DESKTOP_LAYOUT_WIDTH)
    const initialScale = Math.max(0.25, Number(scale.toFixed(3)))
    meta.setAttribute(
      'content',
      `width=${DESKTOP_LAYOUT_WIDTH}, initial-scale=${initialScale}, ${ZOOMABLE}`,
    )
  } else {
    meta.setAttribute('content', DEFAULT_VIEWPORT)
  }
}

export function resetMobileLayout(): void {
  document.documentElement.classList.remove('site-desktop')

  const meta = getViewportMeta()
  meta?.setAttribute('content', MOBILE_VIEWPORT)
}
