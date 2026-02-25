import { verifyToken } from '../utils/jwt.js';

export function auth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  try {
    const { userId } = verifyToken(token);
    req.user = { userId };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
