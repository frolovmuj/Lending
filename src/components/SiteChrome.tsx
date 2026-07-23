import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../animations'
import './SiteChrome.css'

type SiteChromeProps = {
  activeSlide: number
}

const ACT_LABELS = ['ШАГ 1', 'ШАГ 2', 'ШАГ 3']

export function SiteChrome({ activeSlide }: SiteChromeProps) {
  const index = String(activeSlide + 1).padStart(3, '0')

  return (
    <>
      <header className="chrome chrome--top">
        <span className="chrome__item label">Павловск, ру</span>
        <motion.span
          key={activeSlide}
          className="chrome__item label chrome__center"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          Приглашение @avie1337
        </motion.span>
        <span className="chrome__item label">2026</span>
      </header>

      <footer className="chrome chrome--bottom">
        <span className="chrome__item label">{ACT_LABELS[activeSlide]}</span>
        <span className="chrome__center chrome__spacer" aria-hidden="true" />
        <motion.span
          key={index}
          className="chrome__item label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          ({index})
        </motion.span>
      </footer>

      {/* вне .chrome — иначе difference инвертирует gif */}
      <div className="chrome__gif-layer" aria-hidden="true">
        (:-)
        {/* <img
          className="chrome__gif"
          src="/dog.gif"
          alt=""
          draggable={false}
        /> */}
      </div>
    </>
  )
}
