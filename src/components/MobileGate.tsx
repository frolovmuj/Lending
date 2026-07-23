import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { shouldBlockMobile } from '../utils/device'
import { EASE_OUT_EXPO } from '../animations'
import './MobileGate.css'

type MobileGateProps = {
  onPass: () => void
}

export function MobileGate({ onPass }: MobileGateProps) {
  const [secondsLeft, setSecondsLeft] = useState(5)
  const [showScreenshot, setShowScreenshot] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const checkDesktopMode = () => {
      if (!shouldBlockMobile()) onPass()
    }

    checkDesktopMode()
    const interval = window.setInterval(checkDesktopMode, 400)
    window.addEventListener('resize', checkDesktopMode)
    window.addEventListener('orientationchange', checkDesktopMode)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('resize', checkDesktopMode)
      window.removeEventListener('orientationchange', checkDesktopMode)
    }
  }, [onPass])

  useEffect(() => {
    if (showScreenshot) return

    if (secondsLeft <= 0) {
      setShowScreenshot(true)
      return
    }

    const timer = window.setTimeout(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [secondsLeft, showScreenshot])

  return (
    <div className="mobile-gate">
      <motion.div
        className="mobile-gate__card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      >
        <p className="mobile-gate__eyebrow label">Мобильная версия</p>

        <h1 className="mobile-gate__title">
          Жаль, что не с компьютера(
        </h1>

        <p className="mobile-gate__text body-serif">
          Подожду пока ты зайдешь на сайт с него
          <br />
          <span className="mobile-gate__hint">
            (на мобильной версии он плохо работает)
          </span>
        </p>

          <img
            className="mobile-gate__gif"
            src="/mr-bean-mrbean.gif"
            alt="бин"
            draggable={false}
          />

        
      </motion.div>
    </div>
  )
}
