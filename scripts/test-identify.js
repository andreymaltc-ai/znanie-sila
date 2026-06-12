import { readFileSync } from 'fs';
import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(process.cwd(), '.env') });

// Импортируем функцию распознавания
const { identifySpecies } = await import('../lib/claude.js');

const imageFile = process.argv[2] || 'test_plant.jpg';
const imagePath = resolve(process.cwd(), imageFile);
const base64 = readFileSync(imagePath).toString('base64');

console.log(`📸 Тестируем распознавание: ${imageFile}`);
console.log('🔑 CLAUDE_API_KEY:', process.env.CLAUDE_API_KEY ? '✓ задан' : '✗ НЕ ЗАДАН');
console.log('---');

const result = await identifySpecies(base64);

console.log('Результат от Claude Haiku:');
console.log(JSON.stringify(result, null, 2));

if (result.found) {
  console.log('\n✅ Вид определён!');
  console.log(`   Вид в нашем SPECIES: ${result.speciesId ? '✓ найден (id: ' + result.speciesId + ')' : '✗ не найден в списке'}`);
  if (!result.speciesId) {
    console.log('   → В saveDiscovery передастся speciesId=null, запись НЕ будет корректной.');
  } else {
    console.log('   → Можно вызвать saveDiscovery(userId, "' + result.speciesId + '", "Калининград")');
  }
} else {
  console.log('\n❌ Вид не определён:', result.hint);
}
