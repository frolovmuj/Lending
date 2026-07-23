import { useCallback, useEffect, useRef, useState } from 'react'
import { SiteChrome } from './components/SiteChrome'
import { HeroSlide } from './components/HeroSlide'
import { CalendarSlide } from './components/CalendarSlide'
import { FoodSlide } from './components/FoodSlide'
import { ScrollArrow } from './components/ScrollArrow'
import './App.css'

const SLIDES = ['hero', 'calendar', 'food'] as const
const FOOD_SLIDE_INDEX = 2

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [invitationAccepted, setInvitationAccepted] = useState(false)
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null)

  const scrollToSlide = useCallback(
    (index: number) => {
      if (index === FOOD_SLIDE_INDEX && !invitationAccepted) return

      const container = containerRef.current
      if (!container) return
      const clamped = Math.max(0, Math.min(SLIDES.length - 1, index))
      container.scrollTo({
        top: clamped * window.innerHeight,
        behavior: 'smooth',
      })
      setActiveSlide(clamped)
    },
    [invitationAccepted],
  )

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    let index = Math.round(container.scrollTop / window.innerHeight)

    if (!invitationAccepted && index >= FOOD_SLIDE_INDEX) {
      container.scrollTo({
        top: window.innerHeight,
        behavior: 'auto',
      })
      index = 1
    }

    setActiveSlide(index)
  }, [invitationAccepted])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const blockFoodScroll = (event: WheelEvent) => {
      if (invitationAccepted || activeSlide !== 1) return
      if (event.deltaY <= 0) return
      event.preventDefault()
    }

    container.addEventListener('wheel', blockFoodScroll, { passive: false })
    return () => container.removeEventListener('wheel', blockFoodScroll)
  }, [invitationAccepted, activeSlide])

  const handleAcceptInvitation = useCallback(() => {
    if (!selectedDateId || !selectedTime) return
    setInvitationAccepted(true)
  }, [selectedDateId, selectedTime])

  return (
    <div className="app">
      <SiteChrome activeSlide={activeSlide} />

      <div
        ref={containerRef}
        className="app__scroll"
        onScroll={handleScroll}
        data-active={activeSlide}
      >
        <section id="hero" className="slide slide--act1">
          <HeroSlide />
          <ScrollArrow onClick={() => scrollToSlide(1)} act={1} />
        </section>

        <section id="calendar" className="slide slide--act2">
          <CalendarSlide
            selectedDateId={selectedDateId}
            selectedTime={selectedTime}
            invitationAccepted={invitationAccepted}
            onSelectDate={setSelectedDateId}
            onSelectTime={setSelectedTime}
            onAccept={handleAcceptInvitation}
          />
          <ScrollArrow
            onClick={() => scrollToSlide(FOOD_SLIDE_INDEX)}
            act={2}
            disabled={!invitationAccepted}
            hint={
              invitationAccepted
                ? 'Выбор еды'
                : 'Сначала выбери дату и время'
            }
          />
        </section>

        <section id="food" className="slide slide--act3">
          <FoodSlide
            selectedFoodId={selectedFoodId}
            onSelectFood={setSelectedFoodId}
            selectedDateId={selectedDateId}
            selectedTime={selectedTime}
            invitationAccepted={invitationAccepted}
          />
        </section>
      </div>
    </div>
  )
}
