const BASE = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}`;

export async function sendMessage(chatId, text, extra = {}) {
  await fetch(`${BASE}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', ...extra })
  });
}

export async function getFile(fileId) {
  const r = await fetch(`${BASE}/getFile?file_id=${fileId}`);
  const { result } = await r.json();
  return `https://api.telegram.org/file/bot${process.env.TELEGRAM_TOKEN}/${result.file_path}`;
}

export async function downloadAsBase64(url) {
  const r = await fetch(url);
  const buf = await r.arrayBuffer();
  return Buffer.from(buf).toString('base64');
}
