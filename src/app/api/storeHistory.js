import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { userId, imageUrl } = req.body;

  // Store generation history
  const historyKey = `history_${userId}`;
  const history = await kv.get(historyKey) || [];
  history.push({ imageUrl, timestamp: Date.now() });
  await kv.set(historyKey, history);

  res.status(200).json({ message: 'History stored successfully' });
}
