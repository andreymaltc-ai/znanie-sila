// Запусти один раз после деплоя: node scripts/setup-webhook.js

const TOKEN = process.env.TELEGRAM_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;

async function setup() {
  const webhookUrl = `${WEBAPP_URL}/api/webhook`;
  const r = await fetch(`https://api.telegram.org/bot${TOKEN}/setWebhook?url=${webhookUrl}&drop_pending_updates=true`);
  const data = await r.json();
  console.log('Webhook:', data.ok ? '✅ Установлен' : '❌ Ошибка', data.description || '');
  console.log('URL:', webhookUrl);

  // Установить кнопку меню
  const r2 = await fetch(`https://api.telegram.org/bot${TOKEN}/setChatMenuButton`, {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ menu_button: { type:'web_app', text:'🗺 Следопыт', web_app:{ url: WEBAPP_URL } } })
  });
  const d2 = await r2.json();
  console.log('Menu button:', d2.ok ? '✅ Установлена' : '❌ Ошибка');
}

setup().catch(console.error);
