import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const client = axios.create({ baseURL });

export async function signup({ name, email, password, role = 'student' }) {
  const { data } = await client.post('/api/auth/signup', {
    name,
    email,
    password,
    role,
  });
  return data;
}

export async function login(email, password) {
  const { data } = await client.post('/api/auth/login', { email, password });
  return data;
}

export async function logout() {
  await client.post('/api/auth/logout');
}

export async function getMe() {
  const { data } = await client.get('/api/user/me');
  return data;
}
