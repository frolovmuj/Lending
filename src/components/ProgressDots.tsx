import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../animations'
import './ProgressDots.css'

type ProgressDotsProps = {
  total: number
  active: number
  onSelect: (index: number) => void
}

export function ProgressDots({ total, active, onSelect }: ProgressDotsProps) {
  return (
    <nav className="dots" aria-label="Навигация по слайдам">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className="dots__btn"
          onClick={() => onSelect(i)}
          aria-label={`Слайд ${i + 1}`}
          aria-current={active === i ? 'true' : undefined}
        >
          <motion.span
            className="dots__dot"
            animate={{
              scale: active === i ? 1 : 0.6,
              opacity: active === i ? 1 : 0.35,
            }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          />
        </button>
      ))}
    </nav>
  )
}
