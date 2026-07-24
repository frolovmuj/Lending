/** iPhone / Android phone (не планшет, не настоящий ПК). */
export function isMobilePhone(): boolean {
  const ua = navigator.userAgent

  if (/iPad/i.test(ua)) return false

  if (/iPhone|iPod/i.test(ua)) return true

  // iOS 13+ на iPhone: в UA «Macintosh», но это всё ещё телефон
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) {
    return true
  }

  return /Android.*Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)
}

/**
 * Включён «Запрос настольного веб-сайта».
 * На iOS признак — Macintosh в UA без «Mobile».
 */
export function isDesktopSiteMode(): boolean {
  const ua = navigator.userAgent

  // iOS Safari: мобильная версия всегда содержит «Mobile/…» в UA
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) {
    return !/Mobile/i.test(ua)
  }

  // Android Chrome: убирает «Mobile» из UA
  if (/Android/i.test(ua)) {
    return !/Mobile/i.test(ua)
  }

  return false
}

export function shouldBlockMobile(): boolean {
  return isMobilePhone() && !isDesktopSiteMode()
}
