import { AnimatePresence, motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../animations'
import './SuccessModal.css'

type SuccessModalProps = {
  open: boolean
  onClose: () => void
}

export function SuccessModal({ open, onClose }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="success-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
        >
          <motion.button
            type="button"
            className="success-modal__backdrop"
            onClick={onClose}
            aria-label="Закрыть"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="success-modal__card"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          >
            <img
              className="success-modal__photo"
              src="/final.jpg"
              alt=""
              draggable={false}
            />

            <h2 id="success-modal-title" className="success-modal__title">
              Буду ждать!
            </h2>

            <button
              type="button"
              className="success-modal__close"
              onClick={onClose}
            >
              Закрыть
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
