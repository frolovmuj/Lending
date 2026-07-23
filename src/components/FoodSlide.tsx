import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FOOD_OPTIONS,
  MEETING_DATES,
} from '../constants/invitation'
import {
  buildMailtoLink,
  getInvitationDetails,
  sendInvitationResponse,
} from '../utils/sendResponse'
import { fireConfettiFromBottom } from '../utils/confetti'
import { SuccessModal } from './SuccessModal'
import { EASE_OUT_EXPO, fadeUpInViewProps, fadeUpVariant } from '../animations'
import './FoodSlide.css'

type FoodSlideProps = {
  selectedFoodId: string | null
  onSelectFood: (foodId: string) => void
  selectedDateId: string | null
  selectedTime: string | null
  invitationAccepted: boolean
}

const headlineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export function FoodSlide({
  selectedFoodId,
  onSelectFood,
  selectedDateId,
  selectedTime,
  invitationAccepted,
}: FoodSlideProps) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const selectedFood = FOOD_OPTIONS.find((f) => f.id === selectedFoodId)
  const selectedDate = MEETING_DATES.find((d) => d.id === selectedDateId)
  const mailtoLink =
    selectedFoodId && selectedDateId && selectedTime
      ? buildMailtoLink(
          getInvitationDetails({
            dateId: selectedDateId,
            time: selectedTime,
            foodId: selectedFoodId,
          }),
        )
      : null
  const canSubmit =
    invitationAccepted &&
    selectedFoodId &&
    selectedDateId &&
    selectedTime &&
    submitStatus !== 'loading' &&
    submitStatus !== 'success'

  const handleSubmit = async () => {
    if (!canSubmit || !selectedFoodId || !selectedDateId || !selectedTime) return

    setSubmitStatus('loading')
    setErrorMessage(null)
    try {
      await sendInvitationResponse({
        dateId: selectedDateId,
        time: selectedTime,
        foodId: selectedFoodId,
      })
      setSubmitStatus('success')
      fireConfettiFromBottom()
      setShowSuccessModal(true)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Не удалось отправить ответ',
      )
    }
  }

  return (
    <div className="food">
      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <div className="food__grid">
        <div className="food__intro">
          <motion.span className="label food__tag" {...fadeUpInViewProps(0.05, 24)}>
          (Эта я сделал сам))))
          </motion.span>

          <motion.h5
            className="display display--split food__headline"
            variants={headlineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span variants={fadeUpVariant(0.1, 36)}>Может куда-то</motion.span>
            <motion.span variants={fadeUpVariant(0.2, 36)}>Зайдем?</motion.span>
          </motion.h5>

          <motion.span className="label food__act" {...fadeUpInViewProps(0.3, 20)}>
            Шаг 3
          </motion.span>

          <motion.p className="body-serif food__lead" {...fadeUpInViewProps(0.35, 24)}>
            Осталось выбрать лишь только суть встречи
            <img
              className="food__gif"
              src="/dog.gif"
              alt="собака"
              draggable={false}
            />
          </motion.p>

          {selectedDate && selectedTime && (
            <motion.div className="food__booking" {...fadeUpInViewProps(0.42, 20)}>
              <p className="label">Встреча на</p>
              <p className="food__booking-text">
                {selectedDate.weekday}, {selectedDate.label} · {selectedTime}
              </p>
            </motion.div>
          )}
        </div>

        <motion.div
          className="food__list"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {FOOD_OPTIONS.map((item, i) => {
            const isSelected = selectedFoodId === item.id
            return (
              <motion.button
                key={item.id}
                type="button"
                className={`food__item${isSelected ? ' food__item--selected' : ''}`}
                variants={fadeUpVariant(0.05 + i * 0.04, 28)}
                onClick={() => onSelectFood(item.id)}
                aria-pressed={isSelected}
              >
                <span className="food__item-index label">{item.index}</span>
                <span className="food__item-names">
                  <span className="food__item-en">{item.name}</span>
                  <span className="food__item-ru">{item.nameEn}</span>
                </span>
                <span className="food__item-mark" aria-hidden="true">
                  {isSelected ? '●' : '○'}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        <div className="food__aside">
          <motion.span className="label food__index" {...fadeUpInViewProps(0.5, 24)}>
            (03)
          </motion.span>
          <motion.p className="body-serif food__caption" {...fadeUpInViewProps(0.6, 24)}>
            Интересный факт #3:
            Слово "Испания" значит «земля кроликов»
          </motion.p>

          {selectedFood && (
            <motion.div
              className="food__confirm-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            >
              <p className="label">Выбрано</p>
              <p className="food__selected">{selectedFood.name}</p>

              {submitStatus === 'success' ? (
                <p className="food__status food__status--success label">
                  Ответ отправлен на почту ✓
                </p>
              ) : (
                <>
                  <motion.button
                    type="button"
                    className="food__confirm"
                    disabled={!canSubmit}
                    onClick={handleSubmit}
                    whileHover={canSubmit ? { opacity: 0.85 } : undefined}
                    whileTap={canSubmit ? { scale: 0.98 } : undefined}
                  >
                    {submitStatus === 'loading' ? 'Отправка…' : 'Отправить ответ'}
                  </motion.button>
                  {submitStatus === 'error' && (
                    <div className="food__error">
                      <p className="food__status food__status--error label">
                        {errorMessage ?? 'Не удалось отправить. Попробуй ещё раз.'}
                      </p>
                      {mailtoLink && (
                        <a className="food__mailto label" href={mailtoLink}>
                          Открыть в почтовом приложении
                        </a>
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
