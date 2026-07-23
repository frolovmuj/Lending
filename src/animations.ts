export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export const fadeUpProps = (delay = 0, distance = 48) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE_OUT_EXPO, delay },
})

export const fadeUpInViewProps = (delay = 0, distance = 40) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 as const },
  transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay },
})

export const fadeUpVariant = (delay = 0, distance = 48) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_OUT_EXPO, delay },
  },
})
