/** iPhone / Android phone (not tablet, not desktop). */
export function isMobilePhone(): boolean {
  const ua = navigator.userAgent
  return /iPhone|iPod|Android.*Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)
}

/** Browser is showing the desktop version of the site on a touch device. */
export function isDesktopSiteMode(): boolean {
  // iOS Safari: «Запрос настольного веб-сайта» подменяет UA на Macintosh
  if (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1) {
    return true
  }

  // Android Chrome: убирает «Mobile» из user agent
  if (/Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent)) {
    return true
  }

  // Широкий viewport — типичный desktop-layout на телефоне
  if (window.innerWidth >= 980) {
    return true
  }

  return false
}

export function shouldBlockMobile(): boolean {
  return isMobilePhone() && !isDesktopSiteMode()
}
