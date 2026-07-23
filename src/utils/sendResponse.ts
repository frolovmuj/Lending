import {
  FOOD_OPTIONS,
  MEETING_DATES,
  RECIPIENT_EMAIL,
} from '../constants/invitation'

export type ResponsePayload = {
  dateId: string
  time: string
  foodId: string
}

export type InvitationDetails = {
  city: string
  dateLabel: string
  weekday: string
  time: string
  food: string
}

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const REQUEST_TIMEOUT_MS = 15_000

function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url)
}

function looksLikeAccessKey(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
}

export function getInvitationDetails({
  dateId,
  time,
  foodId,
}: ResponsePayload): InvitationDetails {
  const date = MEETING_DATES.find((d) => d.id === dateId)
  const food = FOOD_OPTIONS.find((f) => f.id === foodId)

  if (!date || !food) {
    throw new Error('Invalid response data')
  }

  return {
    city: 'Павловск',
    dateLabel: date.label,
    weekday: date.weekday,
    time,
    food: food.name,
  }
}

export function buildMailtoLink(details: InvitationDetails): string {
  const subject = encodeURIComponent('Ответ на приглашение — Hello')
  const body = encodeURIComponent(
    [
      'Ответ на приглашение',
      '',
      `Город: ${details.city}`,
      `Дата: ${details.dateLabel}`,
      `День: ${details.weekday}`,
      `Время: ${details.time}`,
      `Выбор: ${details.food}`,
    ].join('\n'),
  )

  return `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`
}

async function postJson(url: string, body: Record<string, unknown>): Promise<void> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }

    const result = (await response.json()) as { success?: boolean; message?: string }

    if (!result.success) {
      throw new Error(result.message ?? 'Request failed')
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timed out')
    }
    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}

async function sendViaWeb3Forms(
  details: InvitationDetails,
  accessKey: string,
): Promise<void> {
  await postJson(WEB3FORMS_URL, {
    access_key: accessKey,
    subject: 'Ответ на приглашение — Hello',
    from_name: 'Hello Invitation',
    city: details.city,
    date: details.dateLabel,
    weekday: details.weekday,
    time: details.time,
    choice: details.food,
    message: [
      `Город: ${details.city}`,
      `Дата: ${details.dateLabel} (${details.weekday})`,
      `Время: ${details.time}`,
      `Выбор: ${details.food}`,
    ].join('\n'),
  })
}

async function sendViaGoogleScript(
  details: InvitationDetails,
  webhookUrl: string,
): Promise<void> {
  await postJson(webhookUrl, {
    subject: 'Ответ на приглашение — Hello',
    to: RECIPIENT_EMAIL,
    ...details,
  })
}

export async function sendInvitationResponse(payload: ResponsePayload): Promise<void> {
  const details = getInvitationDetails(payload)
  const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
  const gasWebhook = import.meta.env.VITE_GAS_WEBHOOK_URL?.trim()

  const errors: string[] = []

  if (gasWebhook && !isAbsoluteUrl(gasWebhook)) {
    if (!web3formsKey && looksLikeAccessKey(gasWebhook)) {
      throw new Error(
        'Ключ Web3Forms указан неверно: используй VITE_WEB3FORMS_ACCESS_KEY=... в .env.local',
      )
    }
    throw new Error('VITE_GAS_WEBHOOK_URL должен быть полным URL (https://...)')
  }

  if (web3formsKey) {
    try {
      await sendViaWeb3Forms(details, web3formsKey)
      return
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Web3Forms failed')
    }
  }

  if (gasWebhook) {
    try {
      await sendViaGoogleScript(details, gasWebhook)
      return
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Google Script failed')
    }
  }

  if (!web3formsKey && !gasWebhook) {
    throw new Error(
      'Не настроена отправка: добавь VITE_WEB3FORMS_ACCESS_KEY в файл .env',
    )
  }

  throw new Error(errors.join('; ') || 'Failed to send response')
}
