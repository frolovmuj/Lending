import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, fadeUpProps, fadeUpVariant } from '../animations'
import './HeroSlide.css'

const FLIP_DELAY_MS = 1900
const FLIP_DURATION = 0.9

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const blockReveal = {
  hidden: { opacity: 0, scale: 0.96, clipPath: 'inset(8% 8% 8% 8%)' },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.35 },
  },
}

export function HeroSlide() {
  const [flipStep, setFlipStep] = useState(0)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const firstFlip = window.setTimeout(() => setFlipStep(1), FLIP_DELAY_MS)
    const secondFlip = window.setTimeout(() => setFlipStep(2), FLIP_DELAY_MS * 2)

    return () => {
      window.clearTimeout(firstFlip)
      window.clearTimeout(secondFlip)
    }
  }, [])

  useEffect(() => {
    const node = sceneRef.current
    if (!node) return

    const updateCubeDepth = () => {
      const half = node.clientWidth / 2
      node.style.setProperty('--cube-half', `${half}px`)
    }

    updateCubeDepth()
    const observer = new ResizeObserver(updateCubeDepth)
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="hero">
      <div className="hero__grid">
        <div className="hero__left">
          <motion.span className="label hero__tag" {...fadeUpProps(0.1, 24)}>
            (Эта я сделал сам))))
          </motion.span>

          <motion.h1
            className="display display--split hero__headline"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={fadeUpVariant(0.15)}>Vashny</motion.span>
            <motion.span variants={fadeUpVariant(0.25)}>Text</motion.span>
          </motion.h1>

          <motion.span className="label hero__act-tag" {...fadeUpProps(1.1, 16)}>
            ШАГ 1
          </motion.span>

          <motion.p className="body-serif hero__lead" {...fadeUpProps(0.4, 24)}>
            Я захотел сделать что-то оригинальное и уникальное.
            И вот что получилось :)) , Чтобы увидеть весь сайт,
            Просто проскроль
          </motion.p>
        </div>

        <div className="hero__center">
          <motion.div
            className="hero__frame"
            variants={blockReveal}
            initial="hidden"
            animate="visible"
          >
            <div className="hero__frame-border" aria-hidden="true" />

            <div ref={sceneRef} className="hero__cube-scene">
              <div className="hero__cube-backdrop" aria-hidden="true" />

              <motion.div
                className="hero__cube"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flipStep * -90 }}
                transition={{ duration: FLIP_DURATION, ease: EASE_OUT_EXPO }}
              >
                <div className="hero__cube-face hero__cube-face--1">
                  <span className="hero__hello">Привет, Таня</span>
                </div>

                <div className="hero__cube-face hero__cube-face--2">
                  <span className="hero__hello hero__hello--small">Пойдем гулять</span>
                </div>

                <div className="hero__cube-face hero__cube-face--3">
                  <img
                    className="hero__meme"
                    src="/meme.png"
                    alt="Смайлик"
                    draggable={false}
                  />
                </div>
              </motion.div>
            </div>

            <div className="hero__geo hero__geo--1" aria-hidden="true" />
            <div className="hero__geo hero__geo--2" aria-hidden="true" />
          </motion.div>
        </div>

        <div className="hero__right">
          <motion.span className="label hero__index" {...fadeUpProps(0.6, 24)}>
            (01)
          </motion.span>
          <motion.p className="body-serif hero__aside" {...fadeUpProps(0.7, 24)}>
            Я не знаю что здесь написать, поэтому напишу интересный факт: Самый большой живой организм на Земле — это гриб-опенок в штате Орегон, его мицелий занимает площадь около 9 квадратных километров.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
