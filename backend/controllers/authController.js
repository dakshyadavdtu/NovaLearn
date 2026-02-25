import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';
import bcrypt from 'bcrypt';

function safeUser(user) {
  if (!user) return null;
  const u = user.toObject ? user.toObject() : user;
  delete u.password;
  return u;
}

function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name required' });
    }
    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: 'student',
    });
    const token = signToken(user._id);
    res.cookie('token', token, getCookieOptions());
    return res.status(201).json({ user: safeUser(user) });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    return res.status(500).json({ error: err.message || 'Signup failed' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = signToken(user._id);
    res.cookie('token', token, getCookieOptions());
    return res.json({ user: safeUser(user) });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Login failed' });
  }
}

export async function logout(req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  return res.json({ ok: true });
}
