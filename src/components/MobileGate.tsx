import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { shouldBlockMobile } from '../utils/device'
import { EASE_OUT_EXPO } from '../animations'
import './MobileGate.css'

type MobileGateProps = {
  onPass: () => void
}

export function MobileGate({ onPass }: MobileGateProps) {
  const [secondsLeft, setSecondsLeft] = useState(5)
  const [showInstruction, setShowInstruction] = useState(false)

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
    if (showInstruction) return

    if (secondsLeft <= 0) {
      setShowInstruction(true)
      return
    }

    const timer = window.setTimeout(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [secondsLeft, showInstruction])

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
          Тогда открой этот сайт как Компьютер
          <br />
          <span className="mobile-gate__hint">
            (Запросить настольный веб-сайт)
          </span>
        </p>

        <p className="mobile-gate__reload label">
          После переключения обнови страницу ↻
        </p>

        <AnimatePresence mode="wait">
          {!showInstruction ? (
            <motion.div
              key="countdown"
              className="mobile-gate__countdown-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <span className="label mobile-gate__countdown-label">Инструкция через</span>
              <motion.span
                key={secondsLeft}
                className="mobile-gate__countdown"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              >
                {secondsLeft}
              </motion.span>
            </motion.div>
          ) : (
            <motion.div
              key="instruction"
              className="mobile-gate__instruction"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            >
              <p className="label mobile-gate__instruction-label">
                Нажми «АА» → Запрос настольного веб-сайта
              </p>
              <video
                className="mobile-gate__video"
                src="/video.mov"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
