import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'fallback-dev';

export function signToken(userId) {
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
}

export function verifyToken(token) {
  return jwt.verify(token, secret);
}
