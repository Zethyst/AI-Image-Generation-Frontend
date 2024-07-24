import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { userId } = req.body;
  const rateLimitKey = `rateLimit_${userId}`;
  const rateLimitData = await kv.get(rateLimitKey) || { count: 0, timestamp: Date.now() };

  const oneHour = 3600000; // One hour in milliseconds
  const now = Date.now();

  if (now - rateLimitData.timestamp < oneHour) {
    if (rateLimitData.count >= 3) {
      return res.status(429).json({ message: 'Rate limit exceeded' });
    } else {
      rateLimitData.count += 1;
    }
  } else {
    rateLimitData.count = 1;
    rateLimitData.timestamp = now;
  }

  await kv.set(rateLimitKey, rateLimitData);

  res.status(200).json({ message: 'Request allowed' });
}
