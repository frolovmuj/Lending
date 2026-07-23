import { motion } from 'framer-motion'
import {
  MEETING_DATES,
  TIME_SLOTS,
} from '../constants/invitation'
import { EASE_OUT_EXPO, fadeUpInViewProps, fadeUpVariant } from '../animations'
import './CalendarSlide.css'

type CalendarSlideProps = {
  selectedDateId: string | null
  selectedTime: string | null
  invitationAccepted: boolean
  onSelectDate: (dateId: string) => void
  onSelectTime: (time: string) => void
  onAccept: () => void
}

const headlineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export function CalendarSlide({
  selectedDateId,
  selectedTime,
  invitationAccepted,
  onSelectDate,
  onSelectTime,
  onAccept,
}: CalendarSlideProps) {
  const selectedDate = MEETING_DATES.find((d) => d.id === selectedDateId)
  const canAccept = Boolean(selectedDateId && selectedTime && !invitationAccepted)

  return (
    <div className="calendar">
      <div className="calendar__grid">
        <div className="calendar__intro">
          <motion.span className="label calendar__tag" {...fadeUpInViewProps(0.05, 24)}>
            (Эта я сделал сам))))
          </motion.span>

          <motion.h2
            className="display display--split calendar__headline"
            variants={headlineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span variants={fadeUpVariant(0.1, 36)}>OOchen</motion.span>
            <motion.span variants={fadeUpVariant(0.2, 36)}>Vashny Text</motion.span>
          </motion.h2>

          <motion.span className="label calendar__act" {...fadeUpInViewProps(0.3, 20)}>
            ШАГ 2
          </motion.span>

          <motion.p className="body-serif calendar__lead" {...fadeUpInViewProps(0.35, 24)}>
            Выбери удобный день — с пятницы по воскресенье —
            и время встречи. После подтверждения откроется
            следующий слайд.
          </motion.p>
        </div>

        <motion.div
          className="calendar__card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
        >
          <div className="calendar__card-top">
            <span className="label">Приглашение</span>
            <span className="calendar__year">2026</span>
          </div>

          <div className="calendar__picker">
            <p className="label calendar__picker-label">Дата</p>
            <div className="calendar__dates" role="group" aria-label="Выбор даты">
              {MEETING_DATES.map((date) => (
                <button
                  key={date.id}
                  type="button"
                  className={`calendar__date-btn${selectedDateId === date.id ? ' calendar__date-btn--active' : ''}`}
                  onClick={() => onSelectDate(date.id)}
                  aria-pressed={selectedDateId === date.id}
                  disabled={invitationAccepted}
                >
                  <span className="calendar__date-btn-day">{date.day}</span>
                  <span className="calendar__date-btn-weekday">{date.weekday}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div className="calendar__picker">
              <p className="label calendar__picker-label">Время</p>
              <div className="calendar__times" role="group" aria-label="Выбор времени">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`calendar__time-btn${selectedTime === time ? ' calendar__time-btn--active' : ''}`}
                    onClick={() => onSelectTime(time)}
                    aria-pressed={selectedTime === time}
                    disabled={invitationAccepted}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="calendar__divider" />

          {selectedDate && selectedTime ? (
            <div className="calendar__preview">
              <span className="calendar__day">{selectedDate.day}</span>
              <div className="calendar__date-text">
                <span className="calendar__weekday">{selectedDate.weekday}</span>
                <span className="calendar__month">{selectedDate.label} · {selectedTime}</span>
              </div>
            </div>
          ) : (
            <p className="calendar__hint body-serif">
              Сначала выбери дату, затем время встречи
            </p>
          )}

          <h3 className="calendar__title">Встреча</h3>

          <dl className="calendar__details">
            <div className="calendar__detail">
              <dt className="label">Место встречи</dt>
              <dd>
                ХЗ, возле твоего подъезда
                или возле автобусной остановки
                или возле моего подъезда
                <img
                  className="calendar__gif"
                  src="/cats.gif"
                  alt="котята"
                  draggable={false}
                />
              </dd>
            </div>
          </dl>

          {invitationAccepted ? (
            <p className="calendar__accepted label">Приглашение принято ✓</p>
          ) : (
            <motion.button
              className="calendar__accept"
              disabled={!canAccept}
              onClick={onAccept}
              whileHover={canAccept ? { scale: 1.01 } : undefined}
              whileTap={canAccept ? { scale: 0.99 } : undefined}
            >
              Принять приглашение
            </motion.button>
          )}
        </motion.div>

        <div className="calendar__aside">
          <motion.span className="label calendar__index" {...fadeUpInViewProps(0.5, 24)}>
            (02)
          </motion.span>
          <motion.p className="body-serif calendar__caption" {...fadeUpInViewProps(0.6, 24)}>
            Интересный факт #2:
            При чихании все функции организма, включая сердцебиение, на долю секунды останавливаются.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
