import { sendMessage, getFile, downloadAsBase64 } from '../lib/telegram.js';
import { getOrCreateUser, saveDiscovery } from '../lib/supabase.js';
import { identifySpecies } from '../lib/claude.js';
import { SPECIES } from '../data/species.js';

const WEBAPP_URL = process.env.WEBAPP_URL || 'https://znanie-sila.vercel.app';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const update = req.body;
  try {
    await processUpdate(update);
  } catch (e) {
    console.error('Webhook error:', e);
  }
  res.status(200).json({ ok: true });
}

async function processUpdate(update) {
  const msg = update.message;
  if (!msg) return;

  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const firstName = msg.from.first_name || 'Следопыт';

  await getOrCreateUser(userId, firstName, msg.from.username);

  // Фото → определение вида
  if (msg.photo) {
    await sendMessage(chatId, '🔍 Анализирую фото...');
    const photo = msg.photo[msg.photo.length - 1];
    const fileUrl = await getFile(photo.file_id);
    const base64 = await downloadAsBase64(fileUrl);
    const result = await identifySpecies(base64);

    if (result.found) {
      const discovery = await saveDiscovery(userId, result.speciesId, 'Калининград');
      const isNew = discovery?.isNew;
      const emoji = isNew ? '🌟' : '✓';
      const status = isNew ? 'Новый вид в твоём Атласе! +50 очков' : 'Уже есть в Атласе';

      await sendMessage(chatId,
        `${emoji} <b>${result.nameRu}</b>\n<i>${result.nameLatin}</i>\n\n📖 ${result.fact}\n\n${status}`,
        { reply_markup: { inline_keyboard: [[
          { text: '🗺 Открыть Атлас', web_app: { url: WEBAPP_URL } }
        ]]}});
    } else {
      await sendMessage(chatId,
        `🔍 ${result.hint || 'Не удалось определить вид.'}\n\nПопробуй сфотографировать крупнее — лист, цветок или ствол.`);
    }
    return;
  }

  // Команда /start
  if (msg.text === '/start') {
    const total = SPECIES.length;
    await sendMessage(chatId,
      `🌿 Привет, <b>${firstName}</b>! Добро пожаловать в <b>Следопыт</b>.\n\n` +
      `Калининград скрывает ${total} видов растений — исследуй их, начиная с территории пивоварни Понарт 1849 года.\n\n` +
      `📸 Отправь мне фото растения — определю вид\n` +
      `🗺 Или открой интерактивную карту:`,
      { reply_markup: { inline_keyboard: [[
        { text: '🗺 Открыть карту Следопыта', web_app: { url: WEBAPP_URL } }
      ]]}});
    return;
  }

  // Команда /help
  if (msg.text === '/help') {
    await sendMessage(chatId,
      `<b>Как пользоваться Следопытом:</b>\n\n` +
      `📸 Отправь фото → получи определение вида\n` +
      `🗺 Нажми кнопку → открой карту Калининграда\n` +
      `📖 В Атласе — все найденные виды\n` +
      `🏆 За каждый новый вид — +50 очков\n\n` +
      `Начни с территории Понарт — там 10 видов ждут тебя.`);
    return;
  }

  // Любое другое сообщение
  await sendMessage(chatId,
    `📸 Отправь фото растения — определю вид.\nИли открой карту:`,
    { reply_markup: { inline_keyboard: [[
      { text: '🗺 Открыть Следопыта', web_app: { url: WEBAPP_URL } }
    ]]}});
}
