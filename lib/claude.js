import Anthropic from '@anthropic-ai/sdk';
import { SPECIES } from '../data/species.js';

const SPECIES_LIST = SPECIES.map(s => `${s.nameRu} (${s.nameLatin})`).join(', ');

export async function identifySpecies(base64Image) {
  if (!process.env.CLAUDE_API_KEY) {
    return { found: false, hint: 'AI-определитель не настроен. Обратитесь к администратору.' };
  }

  const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

  const prompt = `Ты эксперт-натуралист Калининградской области. Посмотри на фото и определи что на нём изображено.

Наш список видов для демо: ${SPECIES_LIST}

Если видишь один из этих видов — ответь СТРОГО в JSON:
{
  "found": true,
  "nameRu": "Название на русском",
  "nameLatin": "Научное название",
  "confidence": 0.9,
  "fact": "Один интересный факт об этом виде (1 предложение)",
  "where": "Где растёт/живёт в Калининграде"
}

Если не можешь определить или вида нет в списке:
{
  "found": false,
  "hint": "Краткое описание что видишь (1-2 предложения)"
}

Отвечай ТОЛЬКО JSON, без пояснений.`;

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: [{
          type: 'image',
          source: { type: 'base64', media_type: 'image/jpeg', data: base64Image }
        }, {
          type: 'text',
          text: prompt
        }]
      }]
    });

    const text = response.content[0].text.trim();
    const json = text.match(/\{[\s\S]*\}/)?.[0];
    const result = JSON.parse(json);

    if (result.found) {
      const species = SPECIES.find(s =>
        s.nameLatin === result.nameLatin ||
        s.nameRu === result.nameRu
      );
      return { ...result, speciesId: species?.id || null };
    }
    return result;
  } catch (e) {
    return { found: false, hint: 'Не удалось обработать изображение. Попробуй ещё раз.' };
  }
}
