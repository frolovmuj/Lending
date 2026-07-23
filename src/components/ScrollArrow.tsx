import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../animations'
import './ScrollArrow.css'

type ScrollArrowProps = {
  onClick: () => void
  act: 1 | 2
  disabled?: boolean
  hint?: string
}

export function ScrollArrow({ onClick, act, disabled = false, hint = 'Scroll' }: ScrollArrowProps) {
  return (
    <motion.button
      className={`scroll-arrow scroll-arrow--act${act}${disabled ? ' scroll-arrow--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0 }}
      animate={{ opacity: disabled ? 0.45 : 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: EASE_OUT_EXPO }}
      aria-label={hint}
      aria-disabled={disabled}
    >
      <span className="label scroll-arrow__text">{hint}</span>
      {!disabled && (
        <motion.span
          className="scroll-arrow__line"
          animate={{ scaleY: [1, 0.6, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.button>
  )
}
