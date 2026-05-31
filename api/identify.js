import { identifySpecies } from '../lib/claude.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { image } = req.body;
  if (!image) return res.status(400).json({ error: 'No image' });

  const result = await identifySpecies(image);
  res.status(200).json(result);
}
