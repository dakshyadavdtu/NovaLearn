import User from '../models/User.js';

function safeUser(user) {
  if (!user) return null;
  const u = user.toObject ? user.toObject() : user;
  delete u.password;
  return u;
}

export async function getMe(req, res) {
  const user = await User.findById(req.user.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json({ user: safeUser(user) });
}

export function pingAuth(req, res) {
  return res.json({ ok: true, userId: String(req.user.userId) });
}
