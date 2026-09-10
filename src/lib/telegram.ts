import { CONFESSION_CONFIG } from '@/config/confession';
import { ConfessionResponse } from '@/types/confession';

export async function sendTelegramNotification(response: ConfessionResponse): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing in env. Notification skipped.');
    return false;
  }

  const isYes = response.answer === 'yes';
  const emoji = isYes ? '🎉 ❤️' : '🍃 💭';
  const answerText = isYes ? '*IYA (SETUJU)*' : '*NGGAK (TIDAK)*';
  const timestampStr = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

  const textMessage = `
${emoji} *NOTIFICATION CONFESSION* ${emoji}

👤 *Penerima*: ${CONFESSION_CONFIG.TARGET_NAME}
💌 *Jawaban*: ${answerText}
⏱️ *Waktu*: ${timestampStr} WIB
🎯 *Tombol Nggak Dihindari*: ${response.dodged_count || 0} kali
${response.message ? `💬 *Pesan Opsional*: "${response.message}"` : ''}

🔗 Cek rekap lengkap di: ${CONFESSION_CONFIG.SITE_URL}/admin
`.trim();

  try {
    console.log('[Telegram] Sending fetch request to Telegram API...');
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: textMessage,
        parse_mode: 'Markdown',
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      console.error('[Telegram] API error response:', errJson);
      return false;
    }

    console.log('[Telegram] Notification successfully sent!');
    return true;
  } catch (err) {
    console.error('[Telegram] Network/Fetch Error:', err);
    return false;
  }
}
