export const RECIPIENT_EMAIL = 'mider2052@gmail.com'

export type MeetingDate = {
  id: string
  day: number
  weekday: string
  label: string
}

export const MEETING_DATES: MeetingDate[] = [
  { id: '2026-07-24', day: 24, weekday: 'Пятница', label: '24 июля 2026' },
  { id: '2026-07-25', day: 25, weekday: 'Суббота', label: '25 июля 2026' },
  { id: '2026-07-26', day: 26, weekday: 'Воскресенье', label: '26 июля 2026' },
]

export const TIME_SLOTS = ['16:00', '18:00', '19:00', '20:00', '21:00', '22:00'] as const

export type FoodOption = {
  id: string
  name: string
  nameEn: string
  index: string
}

export const FOOD_OPTIONS: FoodOption[] = [
  { id: 'rolls', name: 'Роллы', nameEn: 'Rolls', index: 'I' },
  { id: 'shawarma', name: 'Шаурма', nameEn: 'Shawarma', index: 'II' },
  { id: 'burgers', name: 'Бургеры', nameEn: 'Burgers', index: 'III' },
  { id: 'walk', name: 'Просто прогуляться', nameEn: 'Just a walk', index: 'IV' },
]

export const MEETING_LOCATION = 'Павловск'
