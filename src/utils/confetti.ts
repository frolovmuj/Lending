import confetti from 'canvas-confetti'

const COLORS = ['#e8c4cc', '#f0e6c8', '#ffffff', '#c4a035', '#8b3a52']

const BASE_OPTIONS = {
  startVelocity: 26,
  spread: 78,
  ticks: 380,
  gravity: 0.55,
  decay: 0.92,
  scalar: 0.85,
  drift: 0.4,
  colors: COLORS,
}

export function fireConfettiFromBottom(): void {
  const duration = 6000
  const end = Date.now() + duration

  const burst = () => {
    confetti({
      ...BASE_OPTIONS,
      particleCount: 2,
      angle: 78,
      origin: { x: 0.12, y: 1.02 },
    })

    confetti({
      ...BASE_OPTIONS,
      particleCount: 2,
      angle: 102,
      origin: { x: 0.88, y: 1.02 },
    })

    confetti({
      ...BASE_OPTIONS,
      particleCount: 3,
      angle: 90,
      origin: { x: 0.5, y: 1.02 },
    })

    if (Date.now() < end) {
      window.setTimeout(burst, 140)
    }
  }

  burst()
}
