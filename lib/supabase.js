import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function getOrCreateUser(telegramId, firstName, username) {
  const { data: existing } = await supabase
    .from('users')
    .select('*')
    .eq('id', telegramId)
    .single();

  if (existing) return existing;

  const { data } = await supabase
    .from('users')
    .insert({ id: telegramId, first_name: firstName, username, points: 0, level: 1 })
    .select()
    .single();

  return data;
}

export async function saveDiscovery(userId, speciesId, locationName) {
  const { data: existing } = await supabase
    .from('discoveries')
    .select('id')
    .eq('user_id', userId)
    .eq('species_id', speciesId)
    .single();

  if (existing) return { isNew: false };

  await supabase.from('discoveries').insert({ user_id: userId, species_id: speciesId, location_name: locationName });

  const { data: user } = await supabase.from('users').select('points').eq('id', userId).single();
  const newPoints = (user?.points || 0) + 50;
  await supabase.from('users').update({ points: newPoints }).eq('id', userId);

  return { isNew: true, points: 50 };
}

export async function getUserDiscoveries(userId) {
  const { data } = await supabase
    .from('discoveries')
    .select('species_id')
    .eq('user_id', userId);

  return data?.map(d => d.species_id) || [];
}
