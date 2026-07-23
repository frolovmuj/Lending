/**
 * Google Apps Script — резервный способ отправки писем через Gmail.
 *
 * 1. Открой https://script.google.com → New project
 * 2. Вставь код ниже
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Скопируй URL в .env как VITE_GAS_WEBHOOK_URL
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const to = data.to || 'mider2052@gmail.com';
    const subject = data.subject || 'Ответ на приглашение — Hello';
    const body = [
      'Ответ на приглашение',
      '',
      'Город: ' + (data.city || ''),
      'Дата: ' + (data.dateLabel || ''),
      'День: ' + (data.weekday || ''),
      'Время: ' + (data.time || ''),
      'Выбор: ' + (data.food || ''),
    ].join('\n');

    GmailApp.sendEmail(to, subject, body);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: String(error) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ success: true, message: 'Hello invitation webhook is running' }),
  ).setMimeType(ContentService.MimeType.JSON);
}
